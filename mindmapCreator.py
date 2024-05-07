import re
import argparse
import os

import matplotlib.pyplot as plt

import networkx as nx
from openai import OpenAI

import pygraphviz as pgv

client = OpenAI()

def extract_triples(text, max_triples=10,
                    title="Lecture 3: File systems",
                    class_name="Foundational data management",
                    ):
    """
    Extract `max_triples` number of relations (triples) from a given note.

    
    Parameters
    ----------
        text : str
            The note to extract relations (triples) from
        max_triples : int
            The maximum number of relations (triples) to extract
        title : str
            The title of the lecture
        class_name : str
            The name of the class
        school : str
            The name of the school
    
    Returns
    -------
        triples : list
            A list of triples in the format [[subject, predicate, object], ...]
    """

    prompt = f"""You are a perfectly articulate chatbot that extract from lecture transcripts
                from {class_name} class into a list of connected knowledge for students to create
                mindmaps. You are currently teaching {title}. Without including irrelevant information
                like chit-chat, please extract {max_triples} triples of SUBJECT-PREDICATE-OBJECT from
                the following transcript in the format 'Subject - Predicate - Object':\n{text}\n\nTriples :\n."""
    
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    output = response.choices[0].text.strip()
    print(f"Extracted output: {output}")  # Add this line to inspect the output
    triples = []

    for line in output.split('\n'):
        if line:
            delimiter = '-' if '-' in line else ','
            try:
                subject, predicate, obj = line.split(delimiter, 2)
            except:
                continue
            if obj:
                triples.append([subject.strip(), predicate.strip(), obj.strip()])

    return triples

def clean(triples):
    """
    Regex remove symbols at the beginning of the sequence triple, possible symbols
    are: "<number>)", "<number>.", ".", " "

    Parameters
    ----------
        triples : list
            A list of triples in the format [[subject, predicate, object], ...]
    
    Returns
    -------
        cleaned_triples : list
            A list of cleaned triples
    """
    cleaned_triples = []
    for triple in triples:
        triple[0] = triple[0].strip().lower()
        triple[0] = re.sub(r"^\d+\)|^\d+\.", "", triple[0])
        triple[0] = re.sub(r"^\.", "", triple[0])
        triple[0] = re.sub(r"^\s", "", triple[0])
        
        cleaned_triples.append(triple)
    return cleaned_triples

def extract_unique_entities(all_triples, threshold, separated=False):
    triples_0 = set([triple[0] for triple in all_triples])
    triples_2 = set([triple[2] for triple in all_triples])
    
    if separated:
        # create hash of entity-frequency
        entity_freq_0 = {entity: 0 for entity in triples_0}
        entity_freq_2 = {entity: 0 for entity in triples_2}

        # count the frequency of each entity
        for triple in all_triples:
            entity_freq_0[triple[0]] += 1
            entity_freq_2[triple[2]] += 1
        
        # remove triplets whose frequency of triplets[0] less than 2 or triplets[2] less than 2
        all_triples_0 = [triple for triple in all_triples if entity_freq_0[triple[0]] >= threshold]
        all_triples_2 = [triple for triple in all_triples if entity_freq_2[triple[2]] >= threshold]

        # group triplets that share the same subjects and objects and build knowledge graph for each group
        # for entities in unique entities `entity_freq_0` and `entity_freq_2`:
        all_trips = [all_triples_0, all_triples_2]
        all_triples = all_triples_0 + all_triples_2
        return all_triples, all_trips, entity_freq_0, entity_freq_2

    # join the two sets
    unique_entities = triples_0.union(triples_2)
    # create hash of entity-frequency
    entity_freq = {entity: 0 for entity in unique_entities}

    # count the frequency of each entity
    for triple in all_triples:
        entity_freq[triple[0]] += 1
        entity_freq[triple[2]] += 1
    
    # remove triplets whose frequency of triplets[0] less than 2 or triplets[2] less than 2
    all_triples = [triple for triple in all_triples if entity_freq[triple[0]] >= threshold or entity_freq[triple[2]] >= threshold]

    return all_triples, entity_freq

def write_triples(folder, output, all_triples):
    """
    write the triples to a file, with the format "<subject> - <predicate> - <object>"
    """
    if not os.path.exists(folder):
        os.makedirs(folder)

    with open(folder + "/" + output, "w") as file:
        for triple in all_triples:
            file.write(f"{triple[0]} - {triple[1]} - {triple[2]}\n")

def build_knowledge_graph(triples):
    """
    Build a knowledge graph from the extracted triples

    Parameters
    ----------
        triples : list
            A list of triples in the format [[subject, predicate, object], ...]
    
    Returns
    -------
        G : nx.DiGraph
            A directed graph representing the knowledge graph
    """
    G = nx.DiGraph()

    for subject, predicate, obj in triples:
        subject, predicate, obj = subject.strip(), predicate.strip(), obj.strip()
        G.add_edge(subject, obj, label=predicate)

    return G

def visualize_knowledge_graph(G, entity=None, path="mindmaps"):
    """
    Visualize the knowledge graph in a grid layout

    Parameters
    ----------
        G : nx.DiGraph
            The knowledge graph (map) to visualize
        entity : str
            The entity to visualize the graph for; used to name the output file
            for this map
    """
    plt.figure(figsize=(10, 10))
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, node_size=3000, node_color='lightblue', font_size=12)
    edge_labels = {(u, v): d['label'] for u, v, d in G.edges(data=True)}
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=10)
    # save this figure to file `{path}/map-{entity}.png`, create the folder if it doesn't exist
    plt.savefig(f"{path}/graphIndividual-{entity}.png")
    plt.close()

def make_separated_graph(all_triples, entity_freq_0, entity_freq_2, threshold, map_folder):
    all_triples = [all_triples[0], [], all_triples[1]]
    for i, entity_freq in enumerate([entity_freq_0, [], entity_freq_2]):
        if not entity_freq:
            continue
        for entity, val in entity_freq.items():
            if val <= threshold:
                continue
            group = [triple for triple in all_triples[i] if triple[i] == entity]

            G = build_knowledge_graph(group)
            visualize_knowledge_graph(G, entity=entity + "-" +str(i), path=map_folder)

def make_one_graph(all_triples, output_folder):
    """
    Create a knowledge graph from the extracted triples
    """
    G = pgv.AGraph(strict=False, directed=True)
    
    for triple in all_triples:
        try:
            G.add_edge(triple[0], triple[2], label=triple[1])
        except Exception as e:
            print(e)
            continue
    # write the graph in a file
    G.node_attr['style'] = 'filled'
    G.node_attr['fillcolor'] = 'lightblue'
    G.edge_attr['penwidth'] = 2
    G.graph_attr['splines'] = 'true' # use splines to draw curved edges
    G.graph_attr['ranksep'] = 3 # 1.5 means that the distance between the nodes in the same rank is 1.5 times the distance between the nodes in the previous rank

    for method in ["dot", "neato", "fdp", "sfdp", "twopi", "circo"]:
        G.draw(output_folder + "/graphAugmented-" + method + ".png", prog=method)
    

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract relations (triples) from a file of lecture notes")

    parser.add_argument("-i", "--file", type=str, default="generated-notes.txt",
                        help="The file containing the notes to extract triples from")
    parser.add_argument("-t", "--title", type=str, default="Lecture 3: File systems",
                        help="The title of the lecture")
    parser.add_argument("-c", "--class_name", type=str, default="Foundational data management",
                        help="The name of the class")
    parser.add_argument("-mt", "--max_triples", type=int, default=3,
                        help="The maximum number of triples per short note to extract")
    parser.add_argument("-th", "--threshold", type=int, default=4,
                        help="The threshold for the frequency of entities to keep in the extracted triples")
    parser.add_argument("-o", "--output", type=str, default="generated-relations.txt",
                        help="The file to write the extracted triples to")
    parser.add_argument("-fo", "--filtered_output", type=str, default="filtered-relations.txt",
                        help="The file to write the extracted triples to")
    parser.add_argument("-mf", "--map_folder", type=str, default="mindmaps1",
                        help="The folder to save the generated mindmaps")

    args = parser.parse_args()

    f = open(args.file, "r")
    text = f.read()
    chunks = text.split("\n")
    
    all_triples = []
    for chunk in chunks:
        chunk = chunk.replace("- ", "") # remove the bullet points in the notes
        triples = extract_triples(chunk, title=args.title,
                                class_name=args.class_name,
                                max_triples=args.max_triples)
        # clean triples
        all_triples.extend(clean(triples))

    # write the triples to file
    write_triples(args.map_folder, args.output, all_triples)

    # extract all unique values all_triples and build knowledge graph for each group
    triples, all_trips, all_triples_0, all_triples_2 = extract_unique_entities(all_triples, threshold=args.threshold, separated=True)
    make_separated_graph(all_trips, all_triples_0, all_triples_2, args.threshold, args.map_folder)

    # extract all unique values all_triples and build a single knowledge graph for all relations
    triples, entity_freq = extract_unique_entities(all_triples, threshold=args.threshold)
    make_one_graph(triples, args.map_folder)

    # write the filtered triples to file
    write_triples(args.map_folder, args.filtered_output, triples)


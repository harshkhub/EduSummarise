# EduSummarise
A solution that helps students to quickly go through the lecture and understand the key points by gerating notes and mind maps from the lecture transcripts.

## Create notes from transcripts
You can run the following command to create notes from :
```bash
python notesCreator.py
```
, this will create from transcripts in [transcript.txt](./transcript.txt) notes stored in [generated-notes.txt](./generated-notes.txt) file.

## Create mindmaps from notes
You can run the following command to create a mindmap from a note file:
```bash
python mindmapCreator.py' '-i' 'generated-notes.txt' '-t' 'Lecture 3: File systems' '-c' 'Foundational data management' '-mt' '3' '-th' '4' '-fo' 'filtered-relations.txt' '-o' 'generated-relations.txt' '-mf' 'mind_maps'
```
where:
- `-i`  : The file containing the notes to extract triples from
- `-t`  : The title of the lecture
- `-c`  : The name of the class
- `-mt` : The maximum number of triples per short note to extract
- `-th` : The threshold for the frequency of entities to keep in the extracted triples
- `-o`  : The file to write the extracted triples to
- `-fo` : The file to write the extracted triples to
- `-mf` : The folder to save the generated mindmaps

<!-- add figures from ./mindmaps/ -->
Two types of mind maps are generated:
- Augmented mind maps: the whole lecture will be summarized in each of these maps. Our framework generate mindmaps in different styles: `"dot", "neato", "fdp", "sfdp", "twopi", "circo"`

    | Style | Mind map |
    |-------|----------|
    | twopi | ![twopi](./mindmaps/graphAugmented-twopi.png) |
    | circo | ![circo](./mindmaps/graphAugmented-circo.png) |
    | fdp   | ![fdp](./mindmaps/graphAugmented-fdp.png) |
    | sfdp  | ![sfdp](./mindmaps/graphAugmented-sfdp.png) |
    | neato | ![neato](./mindmaps/graphAugmented-neato.png) |
    | dot   | ![dot](./mindmaps/graphAugmented-dot.png) |

- Individual maps: these show local maps of the mind map, each focusing on a specific topic:

    | Topic | Mind map |
    |-------|----------|
    | Data | ![Data](./mindmaps/graphIndividual-data-0.png) |
    | Data | ![Data](./mindmaps/graphIndividual-data-2.png) |
    | Hard Disk Drives | ![Hard Disk Drives](./mindmaps/graphIndividual-hard%20disk%20drives-0.png) |
    | Latency | ![Latency](./mindmaps/graphIndividual-latency-0.png) |
    | SSD | ![SSD](./mindmaps/graphIndividual-ssd-0.png) |

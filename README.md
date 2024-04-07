# EduSummarise

## Create mindmaps from notes
You can run the following command to create a mindmap from a note file:
```bash
python mindmapCreator.py -i "generated-notes.txt" -t "Lecture 3: File systems" -c "Foundational data management" -mt 10 -th 5 -o "generated-relations.txt" -mf "mindmaps"
```
where:
- `-i`  : the file containing the notes to extract relations from (relations, or triples, are of the form `"<subject> - <predicate> - <object>"`)
- `-t`  : the title of the lecture
- `-c`  : the name of the class
- `-mt` : the maximum number of triples per note to extract
- `-th` : the threshold for the frequency of entities to keep in the extracted triples
- `-o`  : the file to write the extracted triples to
- `-mf` : the folder to save the generated mindmaps

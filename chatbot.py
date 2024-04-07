import os
import sys


from langchain_community.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import OpenAIEmbeddings



Query = sys.argv[1]

loader = TextLoader('Transcript.txt')
index = VectorstoreIndexCreator().from_loaders([loader])

print (index.query(Query))


from openai import OpenAI
client = OpenAI()
from striprtf.striprtf import rtf_to_text

def split_into_chunks(text, chunk_size=3000):

    sentences = text.split(". ")
    current_chunk = ""
    chunks = []

    for sentence in sentences:
        if len(current_chunk) + len(sentence) > chunk_size:
            chunks.append(current_chunk)
            current_chunk = ""
        current_chunk += sentence + ". "

    if current_chunk:
        chunks.append(current_chunk)

    return chunks
        


def read_transcript(file_path):
    with open(file_path, "r") as file:
        return file.read()
    
transcript_path = "transcript.txt"
transcript_text = read_transcript(transcript_path)

chunks = split_into_chunks(transcript_text)

prompt = "You are a tutor specializing in data management.Your task is to analyze the following lecture transcript and generate concise, informative notes that highlight the key points, concepts, methodologies, and examples mentioned. Ensure the notes are organized, easy to understand, and provide a clear summary of the lecture's content."


def generateNotesFromChunk(chunk, previos_messages):

    messages = previous_messages + [
        {"role": "user", "content": chunk}
    ]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    # Append the new chunk's response to the conversation history
    new_message = {"role": "assistant", "content": response.choices[0].message.content}
    updated_messages = messages + [new_message]
    
    return response.choices[0].message.content, updated_messages

previous_messages = [
    {"role": "system", "content": "You are a perfectly articulate and knowledgable chatbot that turns lectures from USC Computer Science Foundational data management class into detailed notes for students to learn from. You are currently teachingç Lecture 3: File systems. Here is a transcript of a chunk of the lecture, Please convert this speech into notes. Speak in 3rd person, use two sentence bullet points only, and only include relevant information on the topic of this class. Do not ever summarize the transcript given above or summarize your notes below, explain the concepts taught in detail."}
]

all_notes = []
for chunk in chunks:
    notes, previous_messages = generateNotesFromChunk(chunk, previous_messages)
    print(notes)
    all_notes.append(notes)

final_notes = "\n".join(all_notes)
print(final_notes)



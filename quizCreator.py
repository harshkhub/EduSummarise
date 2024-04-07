from openai import OpenAI

client = OpenAI()

def read_lecture_notes(filename):
    with open(filename, "r", encoding="utf-8") as file:
        content = file.read()
    return content

text = read_lecture_notes("generated-notes.txt")

def generate_quiz(text, n_questions):
    previous_messages = [
    {"role": "system", "content": "You are a perfectly articulate and knowledgable chatbot that turns lectures from USC Computer Science Foundational data management class into detailed notes for students to learn from. You are currently teaching Lecture 3: File systems. Here are notes from the lecture, generate a quiz with multiple choice questions and True and False questions, and provide the answers."}
]
    messages = previous_messages + [
        {"role": "user", "content": text}
    ]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0301",
        messages= messages
    )

    return response.choices[0].message.content
    

quiz = generate_quiz(text, 5)

print(quiz)
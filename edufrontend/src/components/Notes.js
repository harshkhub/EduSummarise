import React, { useState, useEffect } from 'react';
import './Notes.css';

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Focus on the title input when component mounts
    document.getElementById('title').focus();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateNote = () => {
    // Split the text into words
    const wordsArray = "This is a sample text".split(" ");
    setWords(wordsArray);

    // Start printing words one by one and speaking them
    let printedText = '';
    for (let i = 0; i < wordsArray.length; i++) {
      setTimeout(() => {
        printedText += wordsArray[i] + ' ';
        setText(printedText);
      }, i * 200); // Adjust the delay here (e.g., 50 milliseconds)
    }

    for (let i = 0; i < wordsArray.length; i++) {
        setTimeout(() => {
          speakWord(wordsArray[i]);
        }, 0.000001); // Adjust the delay here (e.g., 50 milliseconds)
      }
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 3.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Text:", text);
    // You can perform further actions like sending data to a server or updating state.
  };

  return (
    <div id="wrapper">
      <form id="paper" onSubmit={handleSubmit}>
        <div id="margin">Title: <input id="title" type="text" name="title" value={title} onChange={handleTitleChange} /></div>
        <textarea placeholder="Lecture Notes" id="text" name="text" value={text} rows="4" style={{ overflow: 'hidden', wordWrap: 'break-word', resize: 'none', height: '160px' }} readOnly></textarea>
        <br />
        <input id="button" type="button" value="Create" onClick={handleCreateNote} />
      </form>
    </div>
  );
};

export default NoteCreator;

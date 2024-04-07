import React, { useState, useEffect } from 'react';
import './Notes.css';

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    // Focus on the title input when component mounts
    document.getElementById('title').focus();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    //console.log("Title:", title);
    console.log("Text:", text);
    // You can perform further actions like sending data to a server or updating state.
  };

  return (
    <div id="wrapper">
      <form id="paper" onSubmit={handleSubmit}>
        <div id="margin">Title: <input id="title" type="text" name="title" value={title} onChange={handleTitleChange} /></div>
        <textarea placeholder="Enter something funny." id="text" name="text" value={text} onChange={handleTextChange} rows="4" style={{ overflow: 'hidden', wordWrap: 'break-word', resize: 'none', height: '160px' }}></textarea>
        <br />
        <input id="button" type="submit" value="Create" />
      </form>
    </div>
  );
};

export default NoteCreator;

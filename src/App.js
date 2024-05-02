import './App.css';
import './Navbar'
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function App() {
    const [notes, setNotes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editNoteId, setEditNoteId] = useState(null);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        // Load saved notes from local storage on page load
        if (localStorage.getItem('notes')) {
            setNotes(JSON.parse(localStorage.getItem('notes')));
        }
    }, []);

    const addNote = () => {
        setEditMode(false);
        setEditNoteId(null);
        setTitle('');
        setNote('');
    };

    const saveNote = () => {
        if (editMode && editNoteId !== null) {
            // Editing an existing note
            const editedNoteIndex = notes.findIndex((note) => note.id === editNoteId);
            if (editedNoteIndex !== -1) {
                const updatedNotes = [...notes];
                updatedNotes[editedNoteIndex] = { id: editNoteId, title, note };
                setNotes(updatedNotes);
                localStorage.setItem('notes', JSON.stringify(updatedNotes));
            }
        } else {
            // Adding a new note
            const newNoteId = notes.length + 1;
            const newNote = { id: newNoteId, title, note };
            setNotes([...notes, newNote]);
            localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
        }
        addNote();
    };

    const deleteNote = (noteId) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const editNote = (noteId) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        setTitle(noteToEdit.title);
        setNote(noteToEdit.note);
        setEditMode(true);
        setEditNoteId(noteId);
    };

    return (
        <div className="App">
          <Navbar />
            <section>
                <div className="new" style={{ display: editMode ? 'block' : 'none' }}>
                    <div className="vv">
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="icon" onClick={addNote}>
                            <i className="fa-regular fa-circle-xmark">X</i>
                        </div>
                    </div>
                    <div className="vvv">
                        <textarea
                            name="note"
                            id="note"
                            placeholder="Take a note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="btnss">
                        <div className="btn savee" onClick={saveNote}>
                            Save
                        </div>
                    </div>
                </div>

                <div id="savednotes">
                    {notes.map((note) => (
                        <div className="savenote" id={`savenote${note.id}`} key={note.id}>
                            <div className="head">
                                <div className="title">{note.title}</div>
                            </div>
                            <div id="content">{note.note}</div>
                            <div className="hovvv">
                                <div className="icons trash" onClick={() => deleteNote(note.id)}>
                                    <i className="fas fa-trash-alt" style={{ color: '#333' }}></i>
                                </div>
                                <div className="icons edit" onClick={() => editNote(note.id)}>
                                    <i className="fas fa-edit" style={{ color: '#333' }}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="plus" onClick={addNote}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </section>
        </div>
    );
}

export default App;
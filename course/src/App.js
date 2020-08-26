import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'

import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontSize: 16,
    fontStyle: 'italic',
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2020
      </em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrotMessage] = useState('some error happened...')

  useEffect(() => {
    // console.log('effect')
    noteService.getAll().then((initialNotes) => {
      // console.log('promise fulfilled')
      setNotes(initialNotes)
    })
  }, [])
  // console.log('render', notes.length, 'notes')

  // 添加note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // 让服务器生成id
      // id: notes.length + 1,
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  // 显示的note
  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  // 切换note重要性
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changeNote = { ...note, important: !note.important }
    noteService
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrotMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrotMessage(null)
        }, 5000)
        setNotes(notes.filter((note) => note.id !== id))
      })
    console.log('import', id)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      <div>
        <button
          onClick={() => {
            setShowAll(!showAll)
          }}
        >
          show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="a new values..."
        />
        <button type="submit">save</button>
      </form>
      <Footer></Footer>
    </div>
  )
}

export default App

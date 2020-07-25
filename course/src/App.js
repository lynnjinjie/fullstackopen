import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new state...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    // console.log('effect')
    axios.get('http://localhost:3001/notes').then((res) => {
      // console.log('promise fulfilled')
      setNotes(res.data)
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
    axios.post('http://localhost:3001/notes', noteObject).then((res) => {
      console.log('res', res)
      setNotes(notes.concat(res.data))
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
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((n) => n.id === id)
    const changeNote = { ...note, important: !note.important }
    axios.put(url, changeNote).then((res) => {
      setNotes(notes.map((note) => (note.id !== id ? note : res.data)))
    })
    console.log('import', id)
  }
  return (
    <div>
      <h1>Notes</h1>
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
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App

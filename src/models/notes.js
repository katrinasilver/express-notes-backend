const shortId = require('shortid')

const { manageFile } = require('../utils')

const { read, write } = manageFile('../../db/notes.json')

function create(newNote){
  const error = []
  const { content, completed } = newNote
  
  if(!content){
    error.push('Please Provide Content')
  }
  if(typeof completed !== "boolean"){
    error.push('Completed should be a boolean')
  }

  if(error.length) return { error }

  const note = {
    id: shortId.generate(),
    content,
    completed
  }

  const notes = read()
  
  notes.push(note)
  
  write(notes)

  return note
}

function getAll(){
  return read()
}

function getOne(noteId){
  const notes = read()

  const note = notes.find(ele => ele.id === noteId)

  if(!note){
    return { error: ['Note not found']}
  }

  return note
}

function remove(noteId){
  const notes = read()

  const noteidx = notes.findIndex(ele => ele.id === noteId)

  if(noteidx === -1) return { error: ['Not Found']}

  const savedNote = notes[noteidx]

  notes.splice(noteidx, 1)

  write(notes)

  return savedNote
}


module.exports = { create, getAll, getOne, remove }
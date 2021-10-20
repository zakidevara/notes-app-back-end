const { nanoid } = require('nanoid');

class NotesService {
  constructor(){
    this._notes = [];
  }

  addNote({title, body, tags}){
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      id, 
      title, 
      tags, 
      body, 
      createdAt, 
      updatedAt
    };

    this._notes.push(newNote);
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if(!isSuccess){
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes(){
    return this._notes;
  }

  getNoteById(id){
    const note = this._notes.filter((n) => n.id === id)[0];
    if(!note){
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, {title, body, tags}){
    const updatedAt = new Date().toISOString();

    const index = this._notes.findIndex((note) => note.id === id);

    if(index !== -1){
      this._notes[index] = {
        ...this._notes[index],
        title,
        tags,
        body,
        updatedAt,
      };

      return this._notes[index];
    }else{
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }    
  }

  deleteNoteById(id){
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
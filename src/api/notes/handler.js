class NotesHandler {
    constructor(service){
      this._service = service;
      this.postNoteHandler = this.postNoteHandler.bind(this);
      this.getNotesHandler = this.getNotesHandler.bind(this);
      this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
      this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
      this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    postNoteHandler(request, h){
      try{

        const {title = 'untitled', body, tags} = request.payload;
        const noteId = this._service.addNote({title, body, tags});
        
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId,
          },
        })
        response.code(201);
        return response;
      }catch(error){
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(400);
        return response;
      }
    }
    getNotesHandler(request, h){
      const notes = this._service.getNotes();
      const response = h.response({
        status: 'success',
        data: {
            notes,
        }
      });
      response.code(200);
      return response;
    }
    getNoteByIdHandler(request, h){
      try{
        const {id} = request.params;
        const note = this._service.getNoteById(id);
  
        return h.response({
          status: 'success',
          data: {
              note,
          }
        });
      }catch(error){
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(404);
      }      
    }
    putNoteByIdHandler(request, h){
      try{
        const {id} = request.params;
        const {title, tags, body} = request.payload;
        this._service.editNoteById(id, {title, body, tags});
  
        return {
          status: 'success',
          message: 'Catatan berhasil diperbarui'
        };
      }catch(error){
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(404);
      }
    }
    deleteNoteByIdHandler(request, h){
      try{
        const {id} = request.params;
        this._service.deleteNoteById(id);
  
        return h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
      }catch(error){
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(404);
      }
    }
}

module.exports = NotesHandler;
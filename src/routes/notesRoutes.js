import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesControllers';

const routes = Routes();

routes.get('/notes', getAllNotes);

routes.get('/notes/:noteId', getNoteById);
routers.post('/note', createNote);
routes.delete('/notes/:noteId', deleteNote);
routes.patch('/notes/:noteId', updateNote);

export default routes;

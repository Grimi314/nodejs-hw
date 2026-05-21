import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const routes = Router();

routes.get('/notes', getAllNotes);
routes.get('/notes/:noteId', getNoteById);
routes.post('/notes', createNote);
routes.delete('/notes/:noteId', deleteNote);
routes.patch('/notes/:noteId', updateNote);

export default routes;

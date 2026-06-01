import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const routes = Router();

routes.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

routes.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

routes.post('/notes', celebrate(createNoteSchema), createNote);

routes.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

routes.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default routes;

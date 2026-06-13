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

import { authenticate } from '../middleware/authenticate.js';
const routes = Router();

routes.get('/notes', authenticate, celebrate(getAllNotesSchema), getAllNotes);

routes.get(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById,
);

routes.post('/notes', authenticate, celebrate(createNoteSchema), createNote);

routes.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);

routes.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);

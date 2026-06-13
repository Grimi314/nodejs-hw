import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { page = 1, limit = 10, tag, search } = req.query;

  const filter = {
    userId: req.user._id,
  };

  if (tag) filter.tag = tag;

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  const [notes, total] = await Promise.all([
    Note.find(filter).skip(skip).limit(limit),
    Note.countDocuments(filter),
  ]);

  res.json({
    data: notes,
    total,
    page: Number(page),
    limit: Number(limit),
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.json(note);
};

export const createNote = async (req, res) => {
  const { title, content, tag } = req.body;

  const note = await Note.create({
    title,
    content,
    tag,
    userId: req.user._id,
  });

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.sendStatus(204);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id,
    },
    req.body,
    { new: true },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.json(note);
};

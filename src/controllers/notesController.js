import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { search, tag, page = 1, perPage = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(perPage);

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  if (tag) {
    filter.tag = tag;
  }

  const notesQuery = Note.find(filter);

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    notesQuery.skip(skip).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

// export const registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   const existingUser = await Note.findOne({ email });

//   if (existingUser) {
//     throw createHttpError(400, 'Email in use');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await Note.create({
//     email,
//     password: hashedPassword,
//   });

//   res.status(201).json(newUser);
// };

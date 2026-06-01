import mongoose from 'mongoose';
const { model } = mongoose;
import { TAGS } from '../constants/tags.js';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      enum: [...TAGS],
      default: 'Todo',
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Note = model('Note', noteSchema);

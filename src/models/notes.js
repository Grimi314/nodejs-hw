import { Schema, SchemaType } from 'mongoose';

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: string,
    trim: true,
    default: '',
  },
  tag: {
    enam: [
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ],
    default: 'Todo',
  },

  timestamps: true,
});

export const Note = model('Notes', noteSchema);

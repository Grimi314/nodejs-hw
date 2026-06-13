import mongoose from 'mongoose';

const { model } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: { type: String, unique: true, required: true, trim: true },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  },

  User.pre('save', function () {
    if (!this.username) {
      this.username = this.email;
    }
  }),
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('Note', userSchema);

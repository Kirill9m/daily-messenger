import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  hashedPassword: String,
  savedData: [{
    date: { type: Date, unique: true},
    hours: Number,
    info: String,
  }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema)
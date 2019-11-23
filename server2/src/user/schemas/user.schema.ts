import * as mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';


export const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})



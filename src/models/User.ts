import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
  // these two fields are retrieved from workOS
  workosId: {type: String, required:true, unique: true},
  email: {type: String, required:false, unique:true},

  // these fields are what the user gives us by the sing up forms
  name: { type: String, required: true }, // this can be either the name of the job seeker or the name of the company
  isJobPoster: { type: Boolean, required: true }, // true for job poster, false for job seeker
  isProfileComplete: { type: Boolean, required: false, default: false},
  plan: { 
    type: String, 
    enum: ['free', 'basic', 'premium', 'unlimited'],
    default: 'free',
    required: false
  },
}, {
  timestamps: true,
});

export const UserModel = models?.User || model('User', UserSchema);

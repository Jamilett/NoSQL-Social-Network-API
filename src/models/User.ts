import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Por favor ingresa un correo válido'],
    },
    thoughts: [{
      type: Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [{
      type: Types.ObjectId,
      ref: 'User',
    }],
  }, {
    toJSON: { virtuals: true },
    id: false,
  });
  
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  const User = model('User', userSchema);
  export default User;
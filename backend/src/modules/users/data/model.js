import { Schema, model} from 'mongoose'
import { DOCTYPE, ROLES, } from '../../valueList.js';

const userSchema = new Schema({
  // basic properties
  given_name:  { type: String,   required: true, maxLength: 50 },
  family_name: { type: String,   required: true, maxLength: 50 },
  full_name:   { type: String,   },
  email:       { type: String,   required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Debe completar un email valido'], unique: true },
  password:    { type: String,   required: true },
  role:        { type: String,   default: "Client", enum: ROLES,},
  document:    { type: String,   maxLength: 15 },
  documenttype:{ type: String,   enum: DOCTYPE },

  // aditional properties
  photo:               String,
  presentation:        String,
  birthday:            Date,
  phone:       { type: String, maxLength: 20   },

  // external Auth
  linkedinId:          String,
  linkedinVerified:    Boolean,
  
  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
  connection:  { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const dataModel = model('users', userSchema)

export default dataModel
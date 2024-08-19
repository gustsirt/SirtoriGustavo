import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  title:  { type: String,   required: true, maxLength: 50 },

  // aditional properties

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

const dataModel = model('this', thisSchema)

export default dataModel
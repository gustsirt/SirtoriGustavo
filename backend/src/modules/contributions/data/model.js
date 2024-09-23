import { Schema, model} from 'mongoose'
import { LANGUAJES, PROFESSIONS } from '../../utils/valueList.js'

const ContributionSchema = new Schema({
  // basic properties
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String },
  example: { type: String },
  contributedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  link: { type: String },

  // clasificators
  professions: [{ type: String, enum: PROFESSIONS, required: true }],
  languages: [{ type: String, enum: LANGUAJES, required: true }],
  frameworks: [{ type: String }],  // Ej: React, Django, Flask, Vue
  libraries: [{ type: String }],  // Ej: Lodash, Axios, Pandas

  // data of conection
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('contributions', ContributionSchema)

export default dataModel
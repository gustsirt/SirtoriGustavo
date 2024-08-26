/*1. M1. User Model (User.js)
Este modelo representa a los usuarios asociados en la plataforma.*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  profilePicture: { type: String },
  bio: { type: String },
  skills: [{ type: String }],
  experience: [{ 
    title: { type: String, required: true },
    company: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    description: { type: String }
  }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  certifications: [{
    title: { type: String, required: true },
    institution: { type: String, required: true },
    date: { type: Date, required: true },
    file: { type: String }
  }],
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    website: { type: String }
  },
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);



// ----------------------------------------------------------------------------------
/*2. Project Model (Project.js)
Este modelo representa los proyectos en los que los usuarios han trabajado o están trabajando.*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  repositoryLink: { type: String },
  files: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);



// ----------------------------------------------------------------------------------
/*3. M3. Evaluation Model (Evaluation.js)
Este modelo se utiliza para las evaluaciones periódicas que se hacen a los asociados para asegurar el cumplimiento de las normas.*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  evaluator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  comments: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: { type: String },
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);



// ----------------------------------------------------------------------------------
/*4.4. Opportunity Model (Opportunity.js)
Este modelo representa las oportunidades laborales que se ofrecen a los asociados.*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpportunitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [{ type: String, required: true }],
  experienceRequired: { type: String },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OpportunitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);

// ----------------------------------------------------------------------------------
/*5. Contribution Model (Contribution.js)
Este modelo se utiliza para rastrear las contribuciones de los usuarios a la asociación, como plantillas, recursos, etc.*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContributionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileType: { type: String },
  file: { type: String },
  contributedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ContributionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contribution', ContributionSchema);


// ----------------------------------------------------------------------------------

/*
Conexión entre los Modelos
Los Usuarios (User) pueden tener múltiples Proyectos (Project), Evaluaciones (Evaluation), Oportunidades (Opportunity) aplicadas, y Contribuciones (Contribution).
Los Proyectos tienen múltiples Usuarios como miembros.
Las Evaluaciones están vinculadas a un Usuario y son realizadas por otro Usuario (por ejemplo, un administrador).
Las Oportunidades tienen Usuarios como solicitantes y están vinculadas al Usuario que las publicó.

*/

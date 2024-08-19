import { Joi, Segments } from 'celebrate';

const validSchema = {
  register: {
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().max(50).required(),
      last_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  },
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  updatePassword: {
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().min(6).required(),
    }),
  },
  email: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  },
}

export default validSchema;
import { Joi, Segments } from 'celebrate';

const validSchema = {
  example: {
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().max(50).required(),
      last_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  },
}

export default validSchema;
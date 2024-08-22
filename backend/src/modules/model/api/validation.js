import { Joi, Segments } from 'celebrate';

const validSchema = {
  example: {
    [Segments.BODY]: Joi.object().keys({
      given_name: Joi.string().max(50).required(),
      family_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  },
}

export default validSchema;
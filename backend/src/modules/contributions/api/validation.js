import { Joi, Segments } from 'celebrate';
import { LANGUAJES, PROFESSIONS } from '../../utils/valueList.js';

const validSchema = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().required(),
      link: Joi.string().uri().optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).min(1).required(),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).min(1).required(),
      frameworks: Joi.array().items(Joi.string()).optional().allow(''),
      libraries: Joi.array().items(Joi.string()).optional().allow('')
    }),
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string(),
      link: Joi.string().uri().optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).min(1),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).min(1),
      frameworks: Joi.array().items(Joi.string()).optional().allow(''),
      libraries: Joi.array().items(Joi.string()).optional().allow('')
    }),
  },
}

export default validSchema;
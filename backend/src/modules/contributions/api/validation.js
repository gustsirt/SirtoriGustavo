import { Joi, Segments } from 'celebrate';
import { LANGUAJES, PROFESSIONS } from '../../utils/valueList.js';

const validSchema = {
  get: {
    [Segments.QUERY]: Joi.object().keys({
      _id: Joi.string().optional().hex().length(24),
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().optional().hex().length(24),
      links: Joi.string().uri().optional(),
      //Clasificators:
      professions: Joi.string().valid(...PROFESSIONS).min(1).optional(),
      languages: Joi.string().valid(...LANGUAJES).min(1).optional(),
      frameworks: Joi.string().optional(),
      libraries: Joi.string().optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional()
    }),
  },
  create: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().hex().length(24).required(),
      links: Joi.array().items(Joi.uri()).optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).min(1).required(),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).min(1).required(),
      frameworks: Joi.array().items(Joi.string()).optional().allow(''),
      libraries: Joi.array().items(Joi.string()).optional().allow('')
    }),
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().optional(),
      links: Joi.array().items(Joi.uri()).optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).optional(),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).optional(),
      frameworks: Joi.array().items(Joi.string()).optional(),
      libraries: Joi.array().items(Joi.string()).optional()
    }),
  },
}

export default validSchema;
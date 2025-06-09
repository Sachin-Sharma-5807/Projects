import Joi from 'joi';

const triggerSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().trim().min(1).required(),
  userId: Joi.number().integer().positive().required()
});

export default triggerSchema;
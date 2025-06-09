
import Joi from 'joi';

const actionSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().trim().min(1).required(),
  userId: Joi.number().integer().positive().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});

export default actionSchema;


import Joi from 'joi';

const automationSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),  
  description: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
  userId: Joi.number().integer().positive().required(),
  triggerId: Joi.number().integer().positive().required(),
  actionId: Joi.number().integer().positive().required(),
  platformId: Joi.number().integer().positive().required()
});

export default automationSchema;

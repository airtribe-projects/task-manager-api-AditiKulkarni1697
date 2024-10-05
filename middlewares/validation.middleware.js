
const Joi = require('joi');

const taskSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  due_date: Joi.date().greater('now').required(),
  priority: Joi.string().valid('low', 'medium', 'high').required()
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

module.exports = {validateTask};
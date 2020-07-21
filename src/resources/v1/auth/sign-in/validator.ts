import * as Joi from 'joi';

export const signInRequestValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(64).max(64).required()
});
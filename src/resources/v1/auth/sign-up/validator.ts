import * as Joi from 'joi';

export const signUpRequestValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(64).max(64).required(),
    type: Joi.string().valid('SHIPPER', 'OWNER').required(),
    telephoneNumber: Joi.string(),
    companyName: Joi.string(),
    phoneNumber: Joi.string().required()
});
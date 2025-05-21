import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
    email: Joi.string().min(6).max(50),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid("home", "personal").required()
});
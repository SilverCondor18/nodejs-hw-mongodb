import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid("home", "personal", "work").required()
});

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(5).max(30),
    phoneNumber: Joi.string().min(10).max(13),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("home", "personal", "work")
});


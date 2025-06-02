import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid("home", "personal", "work").required(),
    userId: Joi.string().custom((value, helper) => {
        if(value && !isValidObjectId(value)) {
            return helper.message("User id should be a valid mongo id");
        }
        return true;
    })
});

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(5).max(30),
    phoneNumber: Joi.string().min(10).max(13),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("home", "personal", "work")
});


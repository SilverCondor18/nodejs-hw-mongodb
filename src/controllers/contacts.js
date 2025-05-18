import { createContact, deleteContactById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        data: contacts,
        message: "Successfully found contacts!"
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if(contact) {
        res.status(200).json({
            status: 200,
            data: contact,
            message: `Successfully found contact with id ${contactId}`
        });
        return;
    }
    throw createHttpError(404, "Contact not found");
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContactById(contactId);
    if(contact) {
        res.status(204).send();
        return;
    }
    throw createHttpError(404, "Contact not found");
}

export const upsertContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, {upsert: true});
    if(result) {
        const status = result.isNew ? 201 : 200;
        res.status(status).json({
            status: status,
            message: "Successfully upserted a contact!",
            data: result.contact
        });
        return;
    }
    throw createHttpError(404, "Contact not found");
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if(result) {
        res.status(200).json({
            status: 200,
            message: "Successfully patched a contact!",
            data: result.contact
        });
        return;
    }
    throw createHttpError(404, "Contact not found");
};
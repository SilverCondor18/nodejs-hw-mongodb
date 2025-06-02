import { createContact, deleteContactById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getAllContactsController = async (req, res) => {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({page, perPage, sortBy, sortOrder, filter}, req.user._id);

    res.status(200).json({
        status: 200,
        data: contacts,
        message: "Successfully found contacts!"
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);
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
    const contact = await createContact(req.body, req.user._id);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContactById(contactId, req.user._id);
    if(contact) {
        res.status(204).send();
        return;
    }
    throw createHttpError(404, "Contact not found");
}

export const upsertContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, req.user._id, {upsert: true});
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
    const result = await updateContact(contactId, req.body, req.user._id);
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
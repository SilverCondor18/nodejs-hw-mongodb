import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = "_id", filter = {}}, uid) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find({ userId: uid });
    if(filter.contactType) {
        contactsQuery.where("contactType").equals(filter.contactType);
    }
    if(filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(Boolean(filter.isFavourite));
    }
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData
    };
};

export const getContactById = async (contactId, uid) => {
    const contact = await ContactsCollection.find({ userId: uid }).findById(contactId);
    return contact;
};

export const createContact = async (payload, uid) => {
    const newContact = await ContactsCollection.create({ ...payload, userId: uid });
    return newContact;
};

export const deleteContactById = async (contactId, uid) => {
    const contact = await ContactsCollection.find({ userId: uid }).findByIdAndDelete(contactId);
    return contact;
}

export const updateContact = async (contactId, payload, uid, options = {}) => {
    const result = await ContactsCollection.find({ userId: uid }).findByIdAndUpdate(contactId, payload, {new: true, includeResultMetadata: true, ...options});
    if(!result || !result.value) {
        return null;
    }

    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted)
    };
};
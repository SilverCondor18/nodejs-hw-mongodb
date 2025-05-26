import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = "_id", filter = {}}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
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

export const getContactById = async contactId => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async payload => {
    const newContact = await ContactsCollection.create(payload);
    return newContact;
};

export const deleteContactById = async contactId => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
}

export const updateContact = async (contactId, payload, options = {}) => {
    const result = await ContactsCollection.findByIdAndUpdate(contactId, payload, {new: true, includeResultMetadata: true, ...options});
    if(!result || !result.value) {
        return null;
    }

    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted)
    };
};
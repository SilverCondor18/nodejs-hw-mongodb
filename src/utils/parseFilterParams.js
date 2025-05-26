const parseContactType = contactType => {
    const isString = typeof contactType === "string";
    if(!isString) {
        return;
    }
    const isContactType = contactType => ["home", "personal"].includes(contactType);
    if(isContactType(contactType)) {
        return contactType;
    }
};

const parseIsFavourite = isFavourite => {
    const isString = typeof isFavourite === "string";
    if(!isString) {
        return;
    }

    const isIsFavourite = isFavourite => ["true", "false"].includes(isFavourite);
    if(isIsFavourite(isFavourite)) {
        return isFavourite;
    }
};

export const parseFilterParams = query => {
    const {contactType, isFavourite} = query;
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite
    };
};
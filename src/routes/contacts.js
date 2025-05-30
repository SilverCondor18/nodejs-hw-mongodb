import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import { createContactSchema, updateContactsSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.put('/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(upsertContactController));

router.patch('/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;
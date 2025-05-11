import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
    const app = express();

    const PORT = getEnvVar("PORT", 3000);

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty'
            }
        })
    );

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            data: contacts,
            message: "Successfully found contacts!"
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
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

        res.status(404).json({
            message: "Contact not found"
        });
    })

    app.use(/(.*)/, (req, res) => {
        res.status(404).json({
            message: "Not found"
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
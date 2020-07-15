import { ServerError, Page } from "../models/helpers.models";
import firebase from "../config/database";
import { SchemaHelper } from "../helpers/schema.helper";
import { WriteResult } from '@google-cloud/firestore';
import { ContactSchema, ContactModel } from "../models/contact.model";
import { ResponseModel } from "../models/response.model";


export class ContactService {
    schema: SchemaHelper = new SchemaHelper(ContactSchema);
    private collection = firebase.firestore.collection("contacts");

    findById = async (id: string): Promise<ContactModel> => {
        const refUser = await this.collection.doc(id).get();
        if (refUser.exists) {
            const user = refUser.data();
            user.id = refUser.id;
            return user as ContactModel;
        }

        return null;
    };

    find = async (): Promise<Array<ContactModel>> => {
        try {
            const contacts = new Array<ContactModel>();
            const refContacts = await this.collection.get();
            refContacts.docs.forEach(doc => {
                const contact = doc.data() as ContactModel;
                contacts.push(contact);
            });
            return contacts;
        } catch (error) {
            throw new ServerError(error, 400);
        }
    };

    update = async (contacts: Array<ContactModel>): Promise<Array<ContactModel>> => {
        try {
            contacts.forEach(async (contact, i) => {
                contact.wasSync = 1;
                await this.collection.doc(`${contact.id}`).set(contact);
            });
            return contacts;
        } catch (err) {
            throw new ServerError(err, 400);
        }
    };

    create = async (contacts: Array<ContactModel>): Promise<ResponseModel> => {

        contacts = contacts.map(contact => {
            const validateResult = this.schema.validateSave(contact);
            if (validateResult.hasError) {
                throw new ServerError(validateResult.erros, 400);
            } else {
                return validateResult.model;
            }
        });

        try {
            const response: ResponseModel = {
                deleteLocalData: false,
                contacts: []
            };
            const listContacts = await this.find();
            let maxId = 0;
            listContacts.forEach(contact => {
                if (maxId < contact.id) {
                    maxId = contact.id;
                }
            });

            contacts.forEach(c => {
                if (c.id <= maxId) {
                    response.deleteLocalData = true;
                }
            });

            if (response.deleteLocalData) {
                response.contacts = listContacts;
            }

            contacts.forEach(async (contact, i) => {
                contact.wasSync = 1;
                contact.id = ++maxId;
                contact.idServer = this.collection.doc().id;
                // console.log(contact.idServer);
                response.contacts.push(contact);
                await this.collection.doc(`${contact.id}`).set(contact);
            });
            // console.log(response);

            return response;
        } catch (err) {
            throw new ServerError(err, 400);
        }
    };
}

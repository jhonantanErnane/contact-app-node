import { IController } from "../interface.controller";
import { Request, Response, NextFunction } from "express";
import { ContactService } from "../../services/contact.service";
import { ContactModel } from "../../models/contact.model";
import { ResponseModel } from "../../models/response.model";

export class ContactController implements IController {

    service = new ContactService;

    public static boostrap() {
        return new ContactController();
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getBkp = (req: Request, res: Response, next: NextFunction) => {
        this.service.find().then(resp => {
            res.send(resp);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const contacts = req.body as Array<ContactModel>;
        this.service.create(contacts).then(resp => {
            res.send(resp);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const contacts = req.body as Array<ContactModel>;
        const contactsTobeCreated = new Array<ContactModel>();
        const contactsTobeUpdated = new Array<ContactModel>();

        contacts.forEach(c => {
            if (c.idServer === null || c.idServer === 'null' || c.idServer === undefined) {
                contactsTobeCreated.push(c);
            } else {
                contactsTobeUpdated.push(c);
            }
        });
        try {
            const response: ResponseModel = {
                deleteLocalData: false,
                contacts: []
            };
            const contactsCreated = await this.service.create(contactsTobeCreated);
            const contactsUpdated = await this.service.update(contactsTobeUpdated);

            if (contactsCreated.contacts.length > 0 && contactsUpdated.length > 0) {
                response.deleteLocalData = contactsCreated.deleteLocalData;
                response.contacts = contactsCreated.contacts;
                const contactsUpdatedNotCreated = [];
                contactsUpdated.forEach(cUpdated => {
                    response.contacts.forEach(cCreated => {
                        if (cUpdated.id === cCreated.id) {
                            cCreated = cUpdated;
                        } else {
                            contactsUpdatedNotCreated.push(cUpdated);
                        }
                    });
                });
                contactsUpdatedNotCreated.forEach(c => {
                    response.contacts.push(c);
                });
            } else if (contactsCreated.contacts.length > 0) {
                response.deleteLocalData = contactsCreated.deleteLocalData;
                response.contacts = contactsCreated.contacts;
            } else {
                response.contacts = contactsUpdated;
            }

            res.send(response);

        } catch (error) {
            res.status(400).send(error);
        }

    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }
}
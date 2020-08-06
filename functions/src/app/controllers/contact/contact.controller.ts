import { IController } from "../interface.controller";
import { Request, Response, NextFunction } from "express";
import { ContactService } from "../../services/contact.service";
import { ContactModel } from "../../models/contact.model";
import { ResponseModel } from "../../models/response.model";
import { ServerError } from "../../models/helpers.models";
import { UserModel } from "../../models/user.model";

export class ContactController implements IController {

    service = new ContactService;

    public static boostrap() {
        return new ContactController();
    }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        const user = req['user'] as UserModel;
        console.log('this.service ', this.service);
        
        this.service.findByUserId(user.uid).then(contacts => {
            res.send(contacts);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    getBkp = (req: Request, res: Response, next: NextFunction) => {
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const contact = req.body as ContactModel;
        const user = req['user'] as UserModel;
        if (contact.idServer === null || contact.idServer === 'null' || contact.idServer === undefined) {
            this.service.create(contact, user.uid).then(contactSaved => {
                res.send(contactSaved);
            }).catch(err => {
                res.status(400).send(err);
            });
        } else {
            res.status(400).send(new Error('To create a new contact the contact must not have the id server'));
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const contact = req.body as ContactModel;
        if (contact.idServer === null || contact.idServer === 'null' || contact.idServer === undefined) {
            res.status(400).send(new Error('To update the contact the contact must have the id server'));
        } else {
            this.service.update(contact).then(resp => {
                res.send(resp);
            }).catch(err => {
                res.status(400).send(err);
            });
        }
    }

    updateOld = async (req: Request, res: Response, next: NextFunction) => {
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
            const contactsCreated = await this.service.createOld(contactsTobeCreated);
            const contactsUpdated = await this.service.updateOld(contactsTobeUpdated);

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
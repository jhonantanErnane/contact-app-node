import { ContactModel } from "./contact.model";

export class ResponseModel {
    deleteLocalData: boolean;
    contacts: Array<ContactModel>;
}
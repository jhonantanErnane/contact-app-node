import { CollectionModel } from "./interface.model";

export class ContactModel implements CollectionModel {
    id: number;
    idServer?: string;
    name: string;
    phone: string;
    photo: string;
    nickName: string;
    work: string;
    email: string;
    webSite: string;
    isFavorite: number;
    active?: boolean;
    wasSync?: number;

    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export const ContactSchema = {
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
    },
    phone: {
        type: String,
        required: [true, 'O campo phone é obrigatório']
    },
    photo: {
        type: String,
    },
    nickName: {
        type: String,
    },
    work: {
        type: String,
    },
    email: {
        type: String,
    },
    webSite: {
        type: String,
    },
    isFavorite: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        required: [true, 'O campo active é obrigatório']
    },
    wasSync: {
        type: Boolean,
        required: [true, 'O campo wasSync é obrigatório']
    },
    createdAt: {
        type: Date,
        auto: true,
        onCreated: true
    },
    updatedAt: {
        type: Date,
        auto: true,
        onUpdate: true
    },
    statusAccout: {
        type: Number,
        default: 1
    },

};

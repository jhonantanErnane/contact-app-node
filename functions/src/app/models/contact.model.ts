import { CollectionModel } from "./interface.model";

export class ContactModel implements CollectionModel {
    id: number;
    idServer?: string;
    name: string;
    phoneNumber: string;
    photo: string;
    nickName: string;
    work: string;
    email: string;
    webSite: string;
    isFavorite: number;
    active?: boolean;
    wasSync?: number;
    userId: String;

    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export const ContactSchema = {
    id: {
        type: Number,
        required: [true, 'O campo id é obrigatório']
    },
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
    },
    phoneNumber: {
        type: String,
        required: [true, 'O campo phoneNumber é obrigatório']
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
    userId: {
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
    }

};

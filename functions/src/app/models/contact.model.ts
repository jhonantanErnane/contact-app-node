import { CollectionModel } from "./interface.model";

export class ContactModel implements CollectionModel {
    id: number;
    idServer?: string;
    name: string;
    phone: string;
    photo: string;
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
        required: [true, 'O campo photo é obrigatório']
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

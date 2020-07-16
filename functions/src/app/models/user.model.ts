import { CollectionModel } from "./interface.model";

export class UserModel implements CollectionModel {
    uid: number;
    displayName: string;
    photoUrl: string;
    isAnonymous: boolean;
    email: string;

    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export const UserSchema = {
    displayName: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    isAnonymous: {
        type: Boolean,
        required: [true, 'O campo isAnonymous é obrigatório']
    },
    email: {
        type: String,
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

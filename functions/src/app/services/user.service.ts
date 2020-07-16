import { CollectionModel } from "../models/interface.model";
import { ServerError, Page } from "../models/helpers.models";
import firebase from "../config/database";
import { UserModel, UserSchema } from "../models/user.model";
import { SchemaHelper } from "../helpers/schema.helper";
import { WriteResult } from '@google-cloud/firestore';

export class UserService {
  schema: SchemaHelper = new SchemaHelper(UserSchema);
  // private admin = firebase.admin;
  private collection = firebase.firestore.collection("users");

  findById = async (id: string): Promise<UserModel> => {
    const refUser = await this.collection.doc(id).get();
    if (refUser.exists) {
      const user = refUser.data();
      user.id = refUser.id;
      return user as UserModel;
    }
    return null;
  };

}

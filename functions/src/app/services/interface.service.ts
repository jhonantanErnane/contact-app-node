import { ServerError, Page, PageOptions } from "../models/helpers.models";
import { CollectionModel } from "../models/interface.model";
import { WriteResult } from "@google-cloud/firestore";

export interface IService {
  findById(id: string) : Promise<CollectionModel | ServerError>;
  find(query: any | PageOptions): Promise<Page | ServerError>;
  create(model: CollectionModel): Promise<CollectionModel | ServerError>;
  update(id: string, model: CollectionModel):Promise<WriteResult | ServerError>;
  delete(id: string): Promise<WriteResult | ServerError>;
}
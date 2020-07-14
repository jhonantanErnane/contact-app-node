import { CollectionModel } from "./interface.model";

export class ErrorMessage {
  constructor(message, field) {
    this.message = message;
    this.field = field;
  }
  message: string;
  field: string;
}

export class ServerError {
  constructor(errors?: Array<ErrorMessage> | ErrorMessage, code?: number) {
    this.hasError = true;
    this.erros = errors;
    this.code = code;
  }

  hasError: boolean;
  erros: Array<ErrorMessage> | ErrorMessage;
  code: number;
}

export class Page {
  perPage: number;
  pages: number;
  current: number;
  total: number;
  list = new Array<CollectionModel>();
}

export interface PageOptions {
  perPage: number;
  page: number;
}
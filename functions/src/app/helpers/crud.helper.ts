import { IService } from "../services/interface.service";
import { Verb } from "../enums/verb.enum";
import { RequestHandler } from "express";

export interface Crud {
  service: IService;
  path: string;
  options: Array<{verb: Verb, middleware: Array<RequestHandler>}>
}

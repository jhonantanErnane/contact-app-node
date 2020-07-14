import { NextFunction, Request, Response } from "express";

export interface IController {
  getById(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  create(req: Request, res: Response, next: NextFunction);
  update(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction);
}
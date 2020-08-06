import { Router } from "express";
import { ContactController } from "./contact.controller";
import { auth } from "../../middlewares/auth.middleware";

export class ContactRouter {
  private static controller = ContactController.boostrap();

  public static create(path: string, router: Router) {
    router
      .get(`/${path}/`, auth, this.controller.getAll)
      .post(`/${path}/`, auth, this.controller.create)
  }
}
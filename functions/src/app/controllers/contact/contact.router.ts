import { Router } from "express";
import { ContactController } from "./contact.controller";

export class ContactRouter {
  private static controller = ContactController.boostrap();

  public static create(path: string, router: Router) {
    router
      .get(`/${path}/bkp`, this.controller.getBkp)
      .post(`/${path}/`, this.controller.update)
  }
}
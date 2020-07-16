import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth.middleware";


export class UserRouter {
  private static controller = UserController.boostrap();

  public static create(path: string, router: Router) {
    router
      .get(`/${path}/`, auth, this.controller.getById)
      // .post(`/${path}/`, this.controller.create)
  }
}
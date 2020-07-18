import { IController } from "../interface.controller";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/user.service";

export class UserController implements IController {

    service = new UserService;

    public static boostrap() {
        return new UserController();
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        if (req['user']?.uid) {
            this.service.findById(req['user'].uid).then(resp => {
                res.send(resp);
            }).catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        } else {
            res.status(400).send('User not found');
        }
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        // const newUser = req['user'] as UserModel;
        throw new Error("Method not implemented.");
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }
}
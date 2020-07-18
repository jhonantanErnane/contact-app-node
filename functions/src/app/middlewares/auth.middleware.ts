import { NextFunction, Request, Response } from "express";
import firebase from '../config/database';
import { UserService } from "../services/user.service";

export function auth(req: Request, res: Response, next: NextFunction) {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken: string;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  }

  firebase.admin.verifyIdToken(idToken)
    .then(decodedIdToken => {
      new UserService().findById(decodedIdToken.uid)
        .then(user => {
          if (user) {
            req['user'] = user;
          } else {
            req['user'] = decodedIdToken;
          }
          next();
        }).catch(err => {
          console.log(err);
          res.status(403).send('Unauthorized');
        });
    }).catch(error => {
      console.log(error);
      res.status(403).send('Unauthorized');
    });
}
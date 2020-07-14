import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { ContactRouter } from "./app/controllers/contact/contact.router";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.api();
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    this.app.use(methodOverride());

    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    this.app.use(errorHandler());
  }

  public api() {
    let router: express.Router;
    router = express.Router();
    
    ContactRouter.create('contacts', router);
    this.app.use('/', router);
  }
}
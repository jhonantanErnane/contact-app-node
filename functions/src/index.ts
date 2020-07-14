'use strict';
import * as functions from 'firebase-functions';
import { Server } from './server';

export const api = functions.https.onRequest(Server.bootstrap().app);
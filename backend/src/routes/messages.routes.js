import {Router} from 'express'

import { validateJWT } from '../middleware/validate-jwt.js';
import { findAll } from '../controller/message.controller.js';

const router = Router();

router.get('/',validateJWT,findAll);

export {router};
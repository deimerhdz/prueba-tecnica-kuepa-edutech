import {Router} from 'express'
import { login, register, renewToken } from '../controller/auth.controller.js';
import { loginAuthValidators, registerAuthValidators } from '../validators/auth.validators.js';
import { validateJWT } from '../middleware/validate-jwt.js';

const router = Router();

router.post('/login',loginAuthValidators,login);
router.post('/register',registerAuthValidators,register);
router.get('/check-token',validateJWT, renewToken);

export {router};
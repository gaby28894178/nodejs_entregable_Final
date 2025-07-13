import express from 'express';
import {  register, me, login} from '../controllers/auth.controller.js';
import { authentication } from '../middleware/authentication.js';

const router = express.Router();

router.post('/register', register); // no necesita token
router.post('/login', login);       // no necesita token
router.get('/me', authentication, me); // sí necesita token

export default router;

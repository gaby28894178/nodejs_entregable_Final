 // auth.routes.js 
 
 import express from 'express'; 
 import { login, register, logout, me } from '../controllers/auth.controller.js'; 
 import { authentication } from '../middleware/authentication.js';

 const router = express.Router(); 

 router.post('/login', login); 
 router.post('/register', register); 
 router.post('/logout', logout); 
 router.get('/me',authentication,me)


 export default router; 
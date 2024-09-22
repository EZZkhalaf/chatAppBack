import express from 'express';
import  {sendMessage, getMessages } from '../Controllers/sendMessage.js';
import protectRoute from '../middleWare/protectRoute.js';

const router = express.Router();

router.get ('/:id' , protectRoute , getMessages);
router.post('/send/:id' ,protectRoute, sendMessage);//protectROute for auth first then sendMessage


export default router;
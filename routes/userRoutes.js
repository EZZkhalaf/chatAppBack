import express from 'express';
import protectRoute from '../middleWare/protectRoute.js';
import { getUsersSide } from '../Controllers/getUsersSide.js';

const router = express.Router();

router.get('/' ,protectRoute, getUsersSide);


export default router;

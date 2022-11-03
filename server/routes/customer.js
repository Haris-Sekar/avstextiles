import express from 'express';
import { add,getAll } from '../controllers/customer.js';

const router = express.Router();

router.post('/add',add);

router.get('/',getAll);

export default router;
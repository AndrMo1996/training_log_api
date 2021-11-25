import express from 'express';

import { getDays, addDay, deleteDay } from '../controllers/days.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getDays);
router.post('/', auth, addDay);
router.delete('/:id', auth, deleteDay);

export default router;
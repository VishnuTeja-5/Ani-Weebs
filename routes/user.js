import express from 'express';
import path from 'path';
import * as uc from '../controllers/userController.js'
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

router.get('/', uc.userDashboard);
router.get('/anime', uc.anime);
router.get('/movies', uc.movie);
router.get('/video/:id', uc.video);
router.post('/search', uc.search);


export default router;
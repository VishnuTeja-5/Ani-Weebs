import express from 'express';
import { upload } from '../middlewares/multerMW.js';
import * as ac from '../controllers/adminController.js';
import 'dotenv/config';

const router = express.Router();

router.get('/', ac.LoginPage);
router.post('/auth', ac.authenticate);
router.get('/home', ac.home);
router.get('/logout', ac.logout);
router.get('/admin-registration', ac.adminReg);
router.post('/newUser', ac.newUser);
router.get('/manage-anime', ac.manageAnimePage);
router.get('/add-anime', ac.addAnimeButton);
router.post('/adding-anime',upload.single('coverImg'), ac.addingAnime);
router.get('/edit-anime/:id', ac.editAnimeButton);
router.post('/editing-anime', upload.single('coverImg'), ac.editingAnime);
router.get('/delete-anime/:id', ac.deleteAnimeButton);
router.get('/add-episode/:id', ac.addEpisodeButton);
router.post('/adding-episode',upload.single('episodeFile'), ac.addingEpisode);
router.get('/edit-episode/:id', ac.editEpisodeButton);
router.post('/editing-episode', upload.single('episodeFile'),ac.editingEpisode);
router.get('/delete-episode/:id', ac.deleteEpisodeButton);
router.get('/manage-movies', ac.manageMoviesPage);
router.get('/add-movie', ac.addMovieButton);
router.post('/adding-movie',upload.single('movieFile'), ac.addingMovie);
router.get('/edit-movie/:id', ac.editMovieButton);
router.post('/editing-movie', upload.single('movieFile'), ac.editingMovie);
router.get('/delete-movie/:id', ac.deleteMovieButton);
router.get('/add-video/:id', ac.addVideoButton);
router.post('/adding-movie-video',upload.single('movieFile'), ac.addingVideo);
router.get('/edit-video/:id', ac.editVideoButton);
router.post('/editing-movie-video', upload.single('movieFile'), ac.editingVideo);
router.get('/delete-video/:id', ac.deleteVideoButton);

export default router;
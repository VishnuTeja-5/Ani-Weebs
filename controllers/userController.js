import express from 'express';
import connection from '../database/db.js';
import 'dotenv/config';

//App variables
const app = express();

const userDashboard = async (req, res) => {
    const topRatedAnimeQuery = "SELECT * FROM `anime` WHERE type='Anime' ORDER BY rating DESC LIMIT 10";
    const topRatedMovieQuery = "SELECT * FROM `anime` WHERE type='Movie' ORDER BY rating DESC LIMIT 10";
    const animeQuery = "SELECT * FROM `anime` WHERE type='Anime' ";
    const movieQuery = "SELECT * FROM `anime` WHERE type='Movie' "

    const topRatedAnime = await new Promise((resolve, reject) => {
        connection.query(topRatedAnimeQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 
    const topRatedMovie = await new Promise((resolve, reject) => {
        connection.query(topRatedMovieQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 
    const allAnime = await new Promise((resolve, reject) => {
        connection.query(animeQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 
    const allMovies = await new Promise((resolve, reject) => {
        connection.query(movieQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 

    let result1 = JSON.parse(JSON.stringify(topRatedAnime));
    let result2 = JSON.parse(JSON.stringify(topRatedMovie));
    let result3 = JSON.parse(JSON.stringify(allAnime));
    let result4 = JSON.parse(JSON.stringify(allMovies));
    res.render('index.ejs',{result1, result2, result3, result4});
    
}

const anime = async (req, res) => {
    const topRatedAnimeQuery = "SELECT * FROM `anime` WHERE type='Anime' ORDER BY rating DESC LIMIT 10";
    const animeQuery = "SELECT * FROM `anime` WHERE type='Anime' ";

    const topRatedAnime = await new Promise((resolve, reject) => {
        connection.query(topRatedAnimeQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
    const allAnime = await new Promise((resolve, reject) => {
        connection.query(animeQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
    let result1 = JSON.parse(JSON.stringify(topRatedAnime));
    let result3 = JSON.parse(JSON.stringify(allAnime));

    res.render('anime.ejs',{result1, result3});
}

const movie = async (req, res) => {

    const topRatedMovieQuery = "SELECT * FROM `anime` WHERE type='Movie' ORDER BY rating DESC LIMIT 10";
    const movieQuery = "SELECT * FROM `anime` WHERE type='Movie' ";

    const topRatedMovie = await new Promise((resolve, reject) => {
        connection.query(topRatedMovieQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 
    const allMovies = await new Promise((resolve, reject) => {
        connection.query(movieQuery, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    }); 

    let result2 = JSON.parse(JSON.stringify(topRatedMovie));
    let result4 = JSON.parse(JSON.stringify(allMovies));

    res.render('movies.ejs',{result2, result4});
}

const video = async (req, res) => {
    let animeId = parseInt(req.params.id);
    let episodeList;
    const query1 = "SELECT * FROM anime WHERE anime_id = ?"

    const info = await new Promise((resolve, reject) => {
        connection.query(query1,[animeId],(error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
    if(info[0].type==='Anime'){
        const query2 = "SELECT * FROM episode WHERE anime_id = ?";
        episodeList = await new Promise((resolve, reject) => {
            connection.query(query2,[animeId],(error, results) => {
                if(error) reject(error);
                resolve(results);
            });
        });
    } else {
        const query2 = "SELECT * FROM movie WHERE anime_id = ?";
        episodeList = await new Promise((resolve, reject) => {
            connection.query(query2,[animeId],(error, results) => {
                if(error) reject(error);
                resolve(results);
            });
        });
    }

    let parsedInfo = JSON.parse(JSON.stringify(info));
    let parsedEpisodes = JSON.parse(JSON.stringify(episodeList));

    res.render('video.ejs',{result:parsedInfo, episodeList : parsedEpisodes});
}

const search = async (req, res) => {
    let animeName = '%'+req.body.search+'%';
    const query = "SELECT * FROM anime WHERE anime_name LIKE  ? ";
    let result;

    if(animeName){
        result = await new Promise((resolve, reject) => {
            connection.query(query,[animeName],(error, results) => {
                if(error) reject(error);
                resolve(results);
            })
        })
    }
    let parsedInfo = JSON.parse(JSON.stringify(result));
    
    res.render('search.ejs',{result:parsedInfo})
}
export{
    userDashboard,
    anime,
    movie,
    video,
    search
}
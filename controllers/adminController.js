import express from 'express';
import path from 'path';
import fs from 'fs';
import connection from '../database/db.js';
import { ApiError } from '../utils/ApiError.js';
import session from 'express-session';
import { uploadOnCloudinary, deleteOnCloudinary} from '../utils/cloudinary.js';  
import bcrypt from 'bcryptjs' ;
import 'dotenv/config';



//App variables

const app = express();

// Creating session
app.use(session({
	secret: 'Ani-weebs',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");

const LoginPage = (req, res) => {
    // res.send('Admin page');
    res.sendFile(path.join(process.cwd(), 'views', 'login.html'));
};

const authenticate = (req, res) => {

	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {

		connection.query('SELECT * FROM admin WHERE username = ? and password = ?', [username, password], async function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw new ApiError(500, "Unable to retrieve user data",[error]);
			// If the account exists
			if (results.length > 0) {
				const compare = await bcrypt.compare(password, results[0].password);
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/admin/home');
				
				
			} else {
				res.status(400).send('Incorrect Username and/or Password');
			}			
			
		});
	} else {
		res.status(400).send('Please enter Username and Password!');
	}
};

const newUser = async (req, res) => {
	let username = req.body.uname;
	let password = req.body.pass;
	let cpassword = req.body.cpass;

	if( (username && password) && (password===cpassword)){

		const hashPass = await bcrypt.hash(password,10);

		connection.query('SELECT * FROM admin WHERE username = ?', [username], function(error, results, fields) {
			if(error) throw error;
			if(results.length > 0){
				res.send("User already exists");
			}
			else{
				connection.query('INSERT INTO admin (username,password) VALUES(?,?)',[username, password], function(error, result){
					if(error) throw error;
					else{
						res.redirect('/admin');
					}
				});
			}
		});

		
	}
};

const home = (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.render('admin-dashboard');
	}
	else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

const adminReg = (req, res) => {
	
	res.sendFile(path.join(process.cwd(), 'views', 'admin-registration.html'));
};

const manageAnimePage = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		const query = "SELECT * FROM anime where type='Anime'";

		let animeList = await new Promise((resolve, reject) => {
			connection.query(query,(error, results) => {
				if(error) reject(error)
				resolve(results);
			})
		})
		let result = JSON.parse(JSON.stringify(animeList))
		res.render('manage-anime',{result});
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

const addAnimeButton = (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.render('add-anime.ejs');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

const addingAnime = async (req,res) => {
	let name = req.body.animeName;
	let arc = req.body.arcName;
	let season = req.body.season;
	let type = req.body.type;
	let rating = req.body.rating;
	let genres = req.body.genres;
	let storyLine = req.body.storyLine;
	let coverImgPath = req.file.path;
	// let relativepath = path.relative(process.cwd(), coverImgPath);

	season ||= '0';
	arc ||= '-';
	if(!name) res.send("please enter anime name");
	else if(!type) res.send("Please select file type as movie/anime");
	else if(!rating) res.send("Please enter rating of anime.");
	else if(!genres) res.send("Please enter genres.");
	else if(!storyLine) res.send("Please give a short story line of anime.");
	else if(!coverImgPath) res.send("Please upload a cover image of the anime");
	else{
		let coverImg =  await uploadOnCloudinary(coverImgPath);
		if(!coverImg) res.send("Image not uploaded on cloud");
		connection.query("INSERT into anime(anime_name, arc_name, season, cover_img, cloud_id, genres, rating, type, story_line) VALUES(?,?,?,?,?,?,?,?,?)",[name, arc, season, coverImg.secure_url, coverImg.public_id, genres, rating, type, storyLine], function(error, result){
			if(error){
				fs.unlinkSync(coverImgPath);
				deleteOnCloudinary(coverImg.public_id);
				res.send('failed to add anime');
				console.log(error);
			} 
			else{
				fs.unlinkSync(coverImgPath);
				res.send('Added succesfully <a href = "/admin/manage-anime">click here</a> to Add more anime')
			}
		});
	}
};

const editAnimeButton = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		let animeId = parseInt(req.params.id);
		connection.query("SELECT * FROM anime WHERE anime_id = ?",[animeId],function(error, result, fields){
			if(error) {
				console.log("Unable to get data", error);
				res.status(500);
			}
			let editInfo =  new Object(JSON.parse(JSON.stringify(result[0])));
			connection.query("SELECT * FROM episode WHERE anime_id = ?",[animeId],function(error, results, fields){
				if(error) {
					console.log("Unable to get data", error);
					res.status(500);
				}
				let episodes = new Object(JSON.parse(JSON.stringify(results)));
				res.render('edit-anime.ejs',{editInfo, episodes});
			})
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

const editingAnime = async (req, res) => {
	let id = req.body.animeId;
	let name = req.body.animeName;
	let arc = req.body.arcName;
	let season = req.body.season;
	let type = req.body.type;
	let rating = req.body.rating;
	let genres = req.body.genres;
	let storyLine = req.body.storyLine;
	

	if(!req.file){
		connection.query("UPDATE anime SET anime_name = ?, arc_name = ?, season = ?, genres = ?, rating = ?, type = ?, story_line = ? WHERE anime_id = ?",[name, arc, season, genres, rating, type, storyLine, id],function(error, result){
			if(error){
				// fs.unlinkSync(coverImgPath);
				res.send('failed to update anime');
			} 
			else{
				// fs.unlinkSync(coverImgPath);
				res.send('Updated succesfully <a href = "/admin/manage-anime">click here</a> to Update more anime')
			}
		});
	}
	else {
		let coverImgPath = req.file.path;
		let coverImg =  await uploadOnCloudinary(coverImgPath);
		if(!coverImg) res.send("Image not uploaded on cloud");
		let public_id, cover_img;
		connection.query("SELECT cloud_id, cover_img FROM anime where anime_id=?",[id],function(error,result){
			if(error) throw error;
			else{
				public_id = result[0].cloud_id;
				cover_img = result[0].cover_img;
			}
		})
		
		connection.query("UPDATE anime SET anime_name = ?, arc_name = ?, season = ?, cover_img = ?, cloud_id = ?, genres = ?, rating = ?, type = ?, story_line = ? WHERE anime_id = ?",[name, arc, season, coverImg.secure_url,coverImg.public_id, genres, rating, type, storyLine, id],async function(error, result){
			if(error){
				fs.unlinkSync(coverImgPath);
				const deleteResponse = await deleteOnCloudinary(coverImg.public_id);
				if(!deleteResponse){
					res.send("new Cover Image Deletion Failed");
				}
				res.send('failed to update anime');
			} 
			else{
				fs.unlinkSync(coverImgPath);
				const deleteResponse = await deleteOnCloudinary(public_id);
				if(!deleteResponse){
					res.send("Old Cover Image Deletion Failed");
				}
				res.send('Updated succesfully <a href = "/admin/manage-anime">click here</a> to Update more anime')
			}
		});
	}
}

const deleteAnimeButton = async (req, res) => {
	if (req.session.loggedin) {
		// Output username
		let animeId = parseInt(req.params.id);
		let public_id;
		connection.query("SELECT cloud_id from anime WHERE anime_id = ?",[animeId], async function(error,result){
			if(error) throw new ApiError(500, "Cannot get cloud id");
			public_id = await result[0].cloud_id;
		})
		connection.query("DELETE FROM anime WHERE anime_id = ?",[animeId],async function(error, results, fields){
			if(error) {
				console.log("Unable to DELETE", error);
				res.status(500);
			}
			const deleteResponse = await deleteOnCloudinary(public_id);
			res.send(`Deleted Succesfully <a href = "/admin/manage-anime">click here</a> to Go Back`);
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const addEpisodeButton = (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		let animeId = parseInt(req.params.id);
		res.render('add-episode.ejs',{ id : animeId });
		
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const addingEpisode = async (req, res) => {
	let animeId = req.body.animeId;
	let episodeNo = req.body.episodeNumber;
	let title = req.body.episodeTitle;
	let duration = req.body.episodeDuration;
	let videoFilePath = req.file.path;

	if(!animeId) throw new ApiError(400, "Anime Id need to be filled");
	else if(!episodeNo) throw new ApiError(400, "Episode Number Needed");
	else if(!title) throw new ApiError(400, "Episode Title Needed");
	else if(!duration) throw new ApiError(400, "Episode Duration Needed");
	else if(!videoFilePath) res.send("Please upload a video file of episode");
	let videoFile = await uploadOnCloudinary(videoFilePath);

	if(!videoFile) res.status(500).send("Video not uploaded on cloud ");
	
	connection.query("INSERT into episode(anime_id, episode_number, episode_title, episode_path, cloud_id, duration) VALUES(?, ?, ?, ?, ?, ?)",[animeId, episodeNo, title, videoFile.secure_url, videoFile.public_id, duration], async function(error, result){
		if(error){
			fs.unlinkSync(videoFilePath);
			await deleteOnCloudinary(videoFile.public_id);
			res.status(500).send('failed to add anime');
			console.log(error);
		} 
		else{
			fs.unlinkSync(videoFilePath);
			res.send(`Added succesfully <a href = 'edit-anime/${animeId}'>click here</a> to Add more episodes`);
		}
	});
}

const editEpisodeButton = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		let episodeId = parseInt(req.params.id);
		connection.query("SELECT * FROM episode WHERE episode_id = ?",[episodeId],function(error, results, fields){
			if(error) {
				res.status(500).send("Unable to get episode data", error);
			}
			let result = new Object(JSON.parse(JSON.stringify(results[0])));
			res.render('edit-episode.ejs',{result});
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const editingEpisode = async (req, res) => {
	let episodeId = req.body.episodeId;
	let episodeNo = req.body.episodeNumber;
	let title = req.body.episodeTitle;
	let duration = req.body.episodeDuration;
	let public_id, animeId;

	if(!req.file){
		connection.query("SELECT anime_id FROM episode where episode_id=?",[episodeId],async function(error,result){
			if(error) throw error;
			else{
				animeId = result[0].anime_id
			}
		})
		connection.query("UPDATE episode SET episode_number =?, episode_title =?, duration =? WHERE episode_id =?", [episodeNo, title, duration, episodeId], function(error, result){
			if(error){
				// fs.unlinkSync(coverImgPath);
				res.status(500).send('failed to update episode');
			} 
			else{
				// fs.unlinkSync(coverImgPath);
				res.send(`Updated succesfully <a href = '/admin/edit-anime/${animeId}'>click here</a> to Edit more episodes`)
			}
		});
	}
	else{
		let videoFilePath = req.file.path;
		let videoFile = await uploadOnCloudinary(videoFilePath);
		if(!videoFile) res.status(500).send("Video not uploaded on cloud ");
		connection.query("SELECT cloud_id,anime_id FROM episode where episode_id=?",[episodeId],async function(error,result){
			if(error) throw error;
			else{
				public_id = result[0].cloud_id;
				animeId = result[0].anime_id
			}
		})
		connection.query("UPDATE episode SET episode_number = ?, episode_title = ?, duration = ?, episode_path = ?, cloud_id = ? WHERE episode_id = ?",[episodeNo, title, duration, videoFile.secure_url, videoFile.public_id, episodeId],async function(error, result){
			if(error){
				fs.unlinkSync(videoFilePath);
				res.status(500).send('failed to update episode');
			} 
			else{
				fs.unlinkSync(videoFilePath);
				const deleteResponse = await deleteOnCloudinary(public_id);
				if(!deleteResponse){
					res.status(500).send("Old Cover Image Deletion Failed");
				}
				res.send(`Updated succesfully <a href = '/admin/edit-anime/${animeId}'>click here</a> to Edit more episodes`)
			}
		});
	}
}

const deleteEpisodeButton = async (req, res) => {
	if (req.session.loggedin) {
		// Output username
		let episodeId = parseInt(req.params.id);
		let public_id,animeId;
		connection.query("SELECT cloud_id,anime_id from episode WHERE episode_id = ?",[episodeId], async function(error,result){
			if(error) throw new ApiError(500, "Cannot get cloud id");
			public_id = await result[0].cloud_id;
			animeId = result[0].anime_id;
		})
		connection.query("DELETE FROM episode WHERE episode_id = ?",[episodeId],async function(error, results, fields){
			if(error) {
				console.log("Unable to DELETE", error);
				res.status(500).send("Unable to DELETE");
			}
			const deleteResponse = await deleteOnCloudinary(public_id);
			res.send(`Deleted Succesfully <a href = "/admin/manage-anime">click here</a> to Go Back`);
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const manageMoviesPage = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		let movieList = new Array();
		connection.query("SELECT * FROM anime where type='Movie'",function(error, results, fields){
			if(error) {
				return new ApiError(500,"Unable to get data",error);
			}
			for(let i=0; i<results.length; i++){
				let obj =  new Object(JSON.parse(JSON.stringify(results[i])));
				movieList.push(obj);
			}
			res.render('manage-movies',{result : movieList});
		})
		
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const addMovieButton = async (req,res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.render('add-movie.ejs');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const addingMovie = async (req, res) => {
	let name = req.body.movieName;
	let arc = req.body.arcName;
	let type = req.body.type;
	let rating = req.body.rating;
	let genres = req.body.genres;
	let storyLine = req.body.storyLine;
	let videoFilePath = req.file.path;
	// let relativepath = path.relative(process.cwd(), coverImgPath);
	arc ||= '-';
	if(!name) res.status(400).send("please enter movie name");
	else if(!type) res.status(400).send("Please select file type as movie/movie");
	else if(!rating) res.status(400).send("Please enter rating of movie.");
	else if(!genres) res.status(400).send("Please enter genres.");
	else if(!storyLine) res.status(400).send("Please give a short story line of movie.");
	else if(!videoFilePath) res.status(400).send("Please upload a video file of the movie");
	else{
		let videoFile =  await uploadOnCloudinary(videoFilePath);
		if(!videoFile) res.status(500).send("Image not uploaded on cloud");
		connection.query("INSERT into anime(anime_name, arc_name, cover_img, cloud_id, genres, rating, type, story_line) VALUES(?,?,?,?,?,?,?,?)",[name, arc, videoFile.secure_url, videoFile.public_id, genres, rating, type, storyLine],async function(error, result){
			if(error){
				fs.unlinkSync(videoFilePath);
				await deleteOnCloudinary(videoFile.public_id);
				res.status(500).send('failed to add anime');
				console.log(error);
			} 
			else{
				fs.unlinkSync(videoFilePath);
				res.send('Added succesfully <a href = "/admin/manage-movies">click here</a> to Add more movies')
			}
		});
	}
}

const editMovieButton = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		let animeId = parseInt(req.params.id);
		connection.query("SELECT * FROM anime WHERE anime_id = ?",[animeId],function(error, results, fields){
			if(error) {
				console.log("Unable to get data", error);
				res.status(500);
			}
			let editInfo =  new Object(JSON.parse(JSON.stringify(results[0])));
			connection.query("SELECT * FROM movie WHERE anime_id = ?",[animeId],function(error, result, fields){
				if(error) {
					console.log("Unable to get data", error);
					res.status(500);
				}
				let movieInfo =  new Object(JSON.parse(JSON.stringify(result)));
				res.render('edit-movie.ejs',{ editInfo, movieInfo });
			})
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
};

const editingMovie = async (req, res) => {
	let id = req.body.animeId;
	let name = req.body.movieName;
	let arc = req.body.arcName;
	let type = req.body.type;
	let rating = req.body.rating;
	let genres = req.body.genres;
	let storyLine = req.body.storyLine;
	

	if(!req.file){
		connection.query("UPDATE anime SET anime_name = ?, arc_name = ?, genres = ?, rating = ?, type = ?, story_line = ? WHERE anime_id = ?",[name, arc, genres, rating, type, storyLine, id],function(error, result){
			if(error){
				// fs.unlinkSync(coverImgPath);
				res.send('failed to update anime');
			} 
			else{
				// fs.unlinkSync(coverImgPath);
				res.send('Updated succesfully <a href = "/admin/manage-movies">click here</a> to Update more movies')
			}
		});
	}
	else {
		let videoFilePath = req.file.path;
		let videoFile =  await uploadOnCloudinary(videoFilePath);
		if(!videoFile) res.send("Image not uploaded on cloud");
		let public_id, cover_img;
		connection.query("SELECT cloud_id, cover_img FROM anime where anime_id=?",[id],async function(error,result){
			if(error) throw error;
			else{
				public_id = await result[0].cloud_id;
				cover_img = await result[0].cover_img;
			}
		})
		
		connection.query("UPDATE anime SET anime_name = ?, arc_name = ?, cover_img = ?, cloud_id = ?, genres = ?, rating = ?, type = ?, story_line = ? WHERE anime_id = ?",[name, arc, videoFile.secure_url,videoFile.public_id, genres, rating, type, storyLine, id],async function(error, result){
			if(error){
				fs.unlinkSync(videoFilePath);
				const deleteResponse = await deleteOnCloudinary(videoFile.public_id);
				if(!deleteResponse){
					res.send("new video file Deletion Failed");
				}
				res.send('failed to update movie');
			} 
			else{
				fs.unlinkSync(videoFilePath);
				const deleteResponse = await deleteOnCloudinary(public_id);
				if(!deleteResponse){
					res.send("Old video file Deletion Failed");
				}
				res.send('Updated succesfully <a href = "/admin/manage-movies">click here</a> to Update more movies')
			}
		});
	}
}

const deleteMovieButton = async (req, res) => {
	if (req.session.loggedin) {
		// Output username
		let animeId = parseInt(req.params.id);
		let public_id;
		connection.query("SELECT cloud_id from anime WHERE anime_id = ?",[animeId], async function(error,result){
			if(error) throw new ApiError(500, "Cannot get cloud id");
			public_id = await result[0].cloud_id;
			console.log(public_id);
		})
		connection.query("DELETE FROM anime WHERE anime_id = ?",[animeId],async function(error, results, fields){
			if(error) {
				console.log("Unable to DELETE", error);
				res.status(500);
			}
			const deleteResponse = await deleteOnCloudinary(public_id);
			if(!deleteResponse){
				res.status(500).send("Failed to delete movie on cloud")
			}
			res.send(`Deleted Succesfully <a href = "/admin/manage-movies">click here</a> to Go Back`);
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin");
};

const addVideoButton = (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		let animeId = parseInt(req.params.id);
		res.render('add-movie-video.ejs',{ id : animeId });
		
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const addingVideo = async (req, res) => {
	let animeId = req.body.animeId;
	let title = req.body.movieTitle;
	let duration = req.body.movieDuration;
	let videoFilePath = req.file.path;

	if(!animeId) throw new ApiError(400, "Anime Id need to be filled");
	else if(!title) throw new ApiError(400, "Movie Title Needed");
	else if(!duration) throw new ApiError(400, "Movie Duration Needed");
	else if(!videoFilePath) res.send("Please upload a video file of Movie");
	let videoFile = await uploadOnCloudinary(videoFilePath);

	if(!videoFile) res.status(500).send("Video not uploaded on cloud ");
	
	connection.query("INSERT into movie(anime_id, movie_name, movie_path, cloud_id, duration) VALUES(?, ?, ?, ?, ?)",[animeId, title, videoFile.secure_url, videoFile.public_id, duration], async function(error, result){
		if(error){
			fs.unlinkSync(videoFilePath);
			await deleteOnCloudinary(videoFile.public_id);
			res.status(500).send('failed to add anime');
			console.log(error);
		} 
		else{
			fs.unlinkSync(videoFilePath);
			res.send(`Added succesfully <a href = 'edit-movie/${animeId}'>click here</a>`);
		}
	});
}

const editVideoButton = async (req, res) => {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		let movieId = parseInt(req.params.id);
		connection.query("SELECT * FROM movie WHERE movie_id = ?",[movieId],function(error, results, fields){
			if(error) {
				res.status(500).send("Unable to get episode data", error);
			}
			let result = new Object(JSON.parse(JSON.stringify(results[0])));
			res.render('edit-movie-video.ejs',{result});
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

const editingVideo = async (req, res) => {
	let videoId = req.body.videoId;
	let title = req.body.videoTitle;
	let duration = req.body.videoDuration;
	let public_id, animeId;

	if(!req.file){
		connection.query("SELECT anime_id FROM movie where movie_id=?",[videoId],async function(error,result){
			if(error) throw error;
			else{
				animeId = result[0].anime_id
			}
		})
		connection.query("UPDATE movie SET movie_name =?, duration =? WHERE movie_id =?", [title, duration, videoId], function(error, result){
			if(error){
				// fs.unlinkSync(coverImgPath);
				res.status(500).send('failed to update episode');
			} 
			else{
				// fs.unlinkSync(coverImgPath);
				res.send(`Updated succesfully <a href = '/admin/edit-video/${videoId}'>click here</a>`)
			}
		});
	}
	else{
		let videoFilePath = req.file.path;
		let videoFile = await uploadOnCloudinary(videoFilePath);
		if(!videoFile) res.status(500).send("Video not uploaded on cloud ");
		connection.query("SELECT cloud_id,anime_id FROM movie where movie_id=?",[videoId],async function(error,result){
			if(error) throw error;
			else{
				public_id = result[0].cloud_id;
				animeId = result[0].anime_id
			}
		})
		connection.query("UPDATE movie SET movie_name = ?, duration = ?, movie_path = ?, cloud_id = ? WHERE movie_id = ?",[title, duration, videoFile.secure_url, videoFile.public_id, videoId],async function(error, result){
			if(error){
				fs.unlinkSync(videoFilePath);
				res.status(500).send('failed to update episode');
			} 
			else{
				fs.unlinkSync(videoFilePath);
				const deleteResponse = await deleteOnCloudinary(public_id);
				if(!deleteResponse){
					res.status(500).send("Old Cover Image Deletion Failed");
				}
				res.send(`Updated succesfully <a href = '/admin/edit-video/${videoId}'>click here</a>`)
			}
		});
	}
}

const deleteVideoButton = async (req, res) => {
	if (req.session.loggedin) {
		// Output username
		let movieId = parseInt(req.params.id);
		let public_id,animeId;
		connection.query("SELECT cloud_id,anime_id from movie WHERE movie_id = ?",[movieId], async function(error,result){
			if(error) throw new ApiError(500, "Cannot get cloud id");
			public_id = await result[0].cloud_id;
			animeId = result[0].anime_id;
		})
		connection.query("DELETE FROM movie WHERE movie_id = ?",[movieId],async function(error, results, fields){
			if(error) {
				console.log("Unable to DELETE", error);
				res.status(500).send("Unable to DELETE");
			}
			const deleteResponse = await deleteOnCloudinary(public_id);
			if(!deleteResponse){
				res.send("Failed to delete From Cloud");
			}
			res.send(`Deleted Succesfully <a href = "/admin/manage-movie">click here</a> to Go Back`);
		})
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
}

export {
    LoginPage,
    authenticate,
    home,
	adminReg,
	newUser,
	manageAnimePage,
	addAnimeButton,
	addingAnime,
	editAnimeButton,
	editingAnime,
	deleteAnimeButton,
	addEpisodeButton,
	addingEpisode,
	editEpisodeButton,
	editingEpisode,
	deleteEpisodeButton,
	manageMoviesPage,
	addMovieButton,
	addingMovie,
	editMovieButton,
	editingMovie,
	deleteMovieButton,
	addVideoButton,
	addingVideo,
	editVideoButton,
	editingVideo,
	deleteVideoButton,
	logout
}
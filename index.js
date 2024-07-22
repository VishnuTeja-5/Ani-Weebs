/**
 * Required External Modules
 */
import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import admin from './routes/admin.js';
import user from './routes/user.js';

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 *  App Configuration and load modules
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(process.cwd()));

// Creating session
app.use(session({
	secret: 'Ani-weebs',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * Routes Definitions
 */
app.use('/',user);
app.use('/admin',admin);
app.all('*', (req, res) => {
  res.send('Page not found');
})


/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`server running on http://127.0.0.1:${port}`);
})
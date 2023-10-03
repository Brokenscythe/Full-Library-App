<<<<<<< HEAD
import express from "express";
import session from "express-session";
import path from "path";
import csurf from "csurf";

//ROUTES
import authRoutes from "./routes/authRoutes";
// import bookRoutes from "./routes/bookRoutes";
// import mainRoutes from "./routes/mainRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfTokenMiddleware from "./middlewares/csrf-token";

const app = express();
const PORT = 3000;

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));
app.use(csurf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//Routes
app.use(authRoutes);
// app.use(mainRoutes);
// app.use(bookRoutes);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';

//ROUTES
//import authRoutes from "./routes/authRoutes";
import AuthorRouter from "./routes/authorRoutes";
import BookRouter from "./routes/bookRoutes";
import ReservationRouter from "./routes/reservationRoutes";
import router from './routes/mainRoutes';
import SettingsRouter from "./routes/settingsRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES

const app = express();
const PORT = 3000;
dotenv.config();

//parsira req.body
app.use(bodyParser.json());

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//SERVING STATIC FILES
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));

// middleware koji omogućava da se šalje delete request preko linka
app.use(function (req, res, next) {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    console.log(req.url);
    console.log(req.path);
    req.url = req.path;
  }
  next();
});

//ROUTES
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.use('/', SettingsRouter);
app.use('/reservations', ReservationRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
=======
import express from "express";
import session from "express-session";
import path from "path";
import csurf from "csurf";

//ROUTES
import authRoutes from "./routes/authRoutes";
// import bookRoutes from "./routes/bookRoutes";
import mainRoutes from "./routes/mainRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfTokenMiddleware from "./middlewares/csrf-token";

const app = express();
const PORT = 3000;

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));
app.use(csurf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//Routes
app.use(authRoutes);
app.use(mainRoutes);
// app.use(bookRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
>>>>>>> authentication

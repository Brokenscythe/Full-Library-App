import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import methodOverride from 'method-override';
import { Request, Response, NextFunction } from 'express';
import flash from 'connect-flash';
import csrf from 'csurf';
import cookieParser from "cookie-parser";

//SESSION CONFIG

//ROUTES
import authRoutes from "./routes/authRoutes";
import AuthorRouter from "./routes/authorRoutes";
import BookRouter from "./routes/bookRoutes";
import ReservationRouter from "./routes/reservationRoutes";
import router from './routes/mainRoutes';
import SettingsRouter from "./routes/settingsRoutes";
import userRouter from  "./routes/userRoutes";
import dashBoardRouter from  "./routes/dashBoardRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";


import './utils/passport';

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfToken from "./middlewares/csrf-token";
import { setUserNameLocals } from './middlewares/user-session'; 
const app = express();
const PORT = 3000;
dotenv.config();
// Configure the express-session middleware


//parsira req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));

app.use(checkAuthStatusMiddleware);

//ejs setap
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//staticni fajlovi


app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(path.join(__dirname, 'public')));

//mora sam ovako

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Initialize session
app.use(session({
  secret: 'idemonamore',
  resave: false,
  saveUninitialized: false,
}));
app.use(setUserNameLocals);
// Flash middleware should come after session
app.use(flash());

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



// Pravi redoslijed -custom  middleware nakon csurf


app.use(csrf());

app.use(addCsrfToken);



// Error handling za CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
   
    res.status(403).send('Invalid CSRF token');
  } else {
    next(err);
  }
});





//ROUTE
app.use("/", authRoutes);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.use('/', SettingsRouter);
app.use('/reservations', ReservationRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashBoardRouter);
app.use(router);

//Ruta za obradu nepostojećih zahteva
app.use((req, res) => {
  res.status(404).render("404page");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import methodOverride from 'method-override';


//ROUTES
import authRoutes from "./routes/authRoutes";
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use(
  session({
    secret: 'idemonamore', // a dje no na more....
    resave: false,
    saveUninitialized: true,
  })
);

//ejs setap
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//staticni fajlovi

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(path.join(__dirname, 'public')));
//mora sam ovako
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

//ROUTE
//app.use('/login', authRoutes);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.use('/', SettingsRouter);
app.use('/reservations', ReservationRouter);
app.use(router);

//Ruta za obradu nepostojećih zahteva
app.use((req, res) => {
  res.status(404).render("404page");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

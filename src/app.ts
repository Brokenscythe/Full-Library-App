import express from "express";
import session from "express-session";
import path from "path";
import csurf from "csurf";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';

//ROUTES
import authRoutes from "./routes/authRoutes";
import bookRouter from "./routes/bookRoutes";
import settingsRouter from "./routes/settingsRoutes";
import ReservationRouter from "./routes/reservationRouter";
import AuthorRouter from "./routes/authRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfTokenMiddleware from "./middlewares/csrf-token";

const app = express();
const PORT = 3000;

//parsira req.body
app.use(bodyParser.json());

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

app.use(errorHandlerMiddleware);

//ROUTES
app.use(bookRouter);
app.use(authorRouter);
app.use(aettingsRouter);
app.use(ReservationRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

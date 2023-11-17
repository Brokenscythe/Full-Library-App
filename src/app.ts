import express from "express";
import session from "express-session";
import path from "path";
import csurf from "csurf";
import methodOverride from "method-override";
import bodyParser from "body-parser";

//ROUTES
import authRouter from "./routes/authRoutes";
import bookRouter from "./routes/bookRoutes";
import mainRouter from "./routes/mainRoutes";
import settingsRouter from "./routes/settingsRoutes";
import userRouter from "./routes/userRoutes";
import librarianRouter from "./routes/librarianRoutes";
//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfTokenMiddleware from "./middlewares/csrf-token";
// import ReservationRouter from "./routes/reservationRoutes";
import AuthorRouter from "./routes/authorRoutes";
import protectRoutes from "./middlewares/protect-routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
const PORT = 3000;

//parsira req.body
app.use(bodyParser.json());

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));
app.use(csurf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//ROUTES
app.use("/", authRouter);
app.use("/", protectRoutes, mainRouter);
app.use("/",protectRoutes, userRouter);
app.use("/", protectRoutes, librarianRouter);
app.use("/books",protectRoutes, bookRouter);
app.use("/authors", protectRoutes, AuthorRouter);
app.use("/",protectRoutes, settingsRouter);
// app.use("/reservations", ReservationRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

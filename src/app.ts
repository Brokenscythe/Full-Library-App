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

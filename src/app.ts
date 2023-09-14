import express from "express";
import session from "express-session";
import path from "path";

//ROUTES
import authRoutes from "./routes/authRoutes";
// import bookRoutes from "./routes/bookRoutes";
// import mainRoutes from "./routes/mainRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES

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

app.use(authRoutes);
// app.use(mainRoutes);
// app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

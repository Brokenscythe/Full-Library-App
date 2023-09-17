import express from "express";
import session from "express-session";
import path from "path";

//ROUTES
import authRoutes from "./routes/authRoutes";
// import bookRoutes from "./routes/bookRoutes";
// import mainRoutes from "./routes/mainRoutes";

//SESSION CONFIG

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";

const app = express();
const PORT = 3000;

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
// app.use(mainRoutes);
// app.use(bookRoutes);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});

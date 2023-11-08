import express from "express";
import session from "express-session";
import path from "path";
import csurf from "csurf";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import flash from 'connect-flash';
import compress from 'compression';




//ROUTES
import authRouter from "./routes/authRoutes";
import bookRouter from "./routes/bookRoutes";
import mainRouter from "./routes/mainRoutes";
import settingsRouter from "./routes/settingsRoutes";
import dashBoardRouter from  "./routes/dashBoardRoutes";
import rentBookRouter from  "./routes/rentBookRouter";
import healthCheckRouter from  "./routes/healthCheckRouter";
import userRouter from "./routes/userRoutes";
import librarianRouter from "./routes/librarianRoutes";

//SESSION CONFIG
import createSessionConfig from "./config/session";

//MIDDLEWARES
import errorHandlerMiddleware from "./middlewares/error-handler";
import checkAuthStatusMiddleware from "./middlewares/check-auth";
import addCsrfTokenMiddleware from "./middlewares/csrf-token";
import ReservationRouter from "./routes/reservationRoutes";
import AuthorRouter from "./routes/authorRoutes";

import CORS from './middlewares/CORS';
//import { setupCluster } from './middlewares/clusterSetup';

require('dotenv').config();

const app = express();

const PORT = 3000;
app.use(methodOverride("_method"));
//parsira req.body
app.use(bodyParser.json());

//VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
//CORS
CORS.mount(app);
//Limiter
app.use(express.urlencoded({
  limit: '10mb', // limit fajlova na 10MB.
  parameterLimit: 1 * 1024 * 1024, //  parameter limit = 1MB..sluzi za ogranicenje velicine paramatara u reequstima,sluzi za prevenciju DoS napada
  extended: false
}));
//Kompresija
app.use(compress({
  level: 9, // Maksimalan nivo kompresije
}));
app.disable('x-powered-by');

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));

// sesija
app.use(
  session({
    secret: 'cokolada',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,         
      sameSite: 'strict',     
      secure: process.env.NODE_ENV === 'production' 
    },
    name: 'Bibliotek4',
  })
);
app.use(csurf());
app.use(flash());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

//bez ovoga 1000x put greska oko tokena
app.use(function (req, res, next) {
  req.csrfToken();
  res.locals._csrf = req.csrfToken();
  next();
});

//ROUTES
app.use("/", authRouter);
app.use('/dashboard',dashBoardRouter,checkAuthStatusMiddleware);
//app.use('/dashboard',dashBoardRouter);
app.use("/", userRouter);
app.use("/", librarianRouter);
app.use("/", mainRouter);
app.use("/books", bookRouter);
app.use("/authors", AuthorRouter);
app.use("/", settingsRouter);
app.use("/", ReservationRouter);
app.use("/", rentBookRouter);
app.use("/health", healthCheckRouter);


app.use(errorHandlerMiddleware);



const server = app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Primljen SIGTERM signal. Lagano gasim server...');
// super za fresh start i memory mgmnt.Minusa ima dosta ali u ovom slucaju vrijeme inicijalizacije je duze
for (const key in require.cache) {
  delete require.cache[key];
}
  // Ugasi server i oslobodi port.
  server.close((err) => {
    if (err) {
      console.error('Greska u gasenju servera:', err);
      process.exit(1); // Ugasi process sa error kodom.
    } else {
      console.log('Server ugasen.Izlazim..');
      process.exit(0); // Uspjesno ugasi proces.
    }
  });
});





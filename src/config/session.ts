import session from "express-session";
import MySQLStore from "express-mysql-session";

const options = {
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.MYSQL_DB as string,
};

const sessionStore = new (MySQLStore(session))({
  ...options,
});

export function createSessionConfig() {
  return {
    key: process.env.SESS_NAME as string,
    secret: process.env.SESS_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

export default createSessionConfig;

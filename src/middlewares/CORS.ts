import cors from 'cors';

import { Application } from 'express';

class CORS {
  public mount(_express: Application): Application {
    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;

    const options = {
      origin: url,
      optionsSuccessStatus: 200, // neki broweseri ne radi na 204
    };

    _express.use(cors(options));

    return _express;
  }
}

export default new CORS();

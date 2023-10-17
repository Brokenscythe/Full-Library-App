import express from 'express';
import { dodajNovogUcenika, prikaziIzmjenuUcenika, prikaziNovogUcenika, prikaziSveUcenike, izmijeniUcenika, obrisiUcenika } from '../controllers/userController';

const router = express.Router();

router.get('/', prikaziSveUcenike);
router.get('/noviUcenik', prikaziNovogUcenika);
router.post('/dodajUcenika', dodajNovogUcenika);
router.get('/izmjenaUcenika/:id', prikaziIzmjenuUcenika);
router.post('/izmjenaUcenika/:id', izmijeniUcenika);
router.get('/brisanjeUcenika/:id', obrisiUcenika);

export default router;

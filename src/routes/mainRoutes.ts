import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard');
});

router.get('/izdateKnjige', (req, res) => {
    res.render('rezervacije/aktivneRezervacije');
});


export default router;
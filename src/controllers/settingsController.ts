import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Category } from '../models/categoryModel';
const prisma = new PrismaClient();

//polisa

export const updateSettings = async (req: Request, res: Response) => {
    const { reservationExpiry, returnDeadline, conflictDeadline } = req.body;
  
    try {
      await prisma.settings.update({
        where: { id: 1 },
        data: {
          reservationExpiry: parseInt(reservationExpiry),
          returnDeadline: parseInt(returnDeadline),
          conflictDeadline: parseInt(conflictDeadline),
        },
      });
      res.redirect('/settings');
    } catch (error) {
      console.log(error);
      res.status(500).send('Greska prilikom update-a polise');
    }
  };

  export const getSettings = async (req: Request, res: Response) => {
    try {
      const settings = await prisma.settings.findUnique({
        where: { id: 1 },
      });
      console.log(settings);
      res.render('settings/settingsPolisa', { settings });
      console.log(settings);
    } catch (error) {
      console.log(error);
      res.status(500).send('Greska prilok ucitavanja polise');
    }
  };

  //kraj polise

  /* //kategorije
  
  export const getKategorije = async (req: Request, res: Response) => {
    try {
      const categoriesData = await prisma.category.findMany();
      const categories: Category[] = categoriesData.map((categoryData) => {
        const category = new Category(categoryData.name, categoryData.id,categoryData.icon);
        return category;
      });
      res.render('settings/settingsKategorije', { categories });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving categories');
    }
  };
  
  
  export const novaKategorija = (req: Request, res: Response) => {
    res.render('kategorije/novaKategorija');
  };

  export const dodajKategoriju = async (req: Request, res: Response) => {
    console.log(req.body);
    const { nazivKategorije } = req.body;
    console.log(nazivKategorije);
    try {
      const novaKategorija = await prisma.category.create({
        data: {
          name: nazivKategorije,
        },
      });
      res.redirect('/settings/category');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error creating category');
    }
  };
  
  export const deleteKategorija = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await Category.getCategory(parseInt(id));
      await category.delete();
      res.redirect('/settings/category');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deleting category');
    }
  };
  
  export const prikaziIzmjenuKategorije = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const category = await Category.getCategory(categoryId);
    res.render('./kategorije/editKategorija', { category });
  };
  
  export const izmijeniKategoriju = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const { nazivKategorije } = req.body;
    const category = new Category(nazivKategorije, categoryId);
    await category.save();
    res.redirect('/settings/kategorije');
  };
  
  
  

  //kraj kategorije

  //zanrovi
  export const getGenre = async (req: Request, res: Response) => {
    try {
      const zanrovi = await prisma.genre.findMany();
      res.render('settings/settingsZanrovi', { zanrovi });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error getting genres');
    }
  };

export const editujZanr = async (req: Request, res: Response) => {
    const { id } = req.params; 
  console.log(id);
    try {
      const genre = await prisma.genre.findUnique({
        where: { id: Number(id) }, 
      });
      res.render('zanrovi/editZanr', { genre });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updat genre');
    }
  };

  export const dodajZanr = async (req: Request, res: Response) => {
    res.render('zanrovi/noviZanr');
  };
  

export const getFormat = async (req: Request, res: Response) => {
    res.render('settings/settingsFormat');
};

export const getIzdavac = async (req: Request, res: Response) => {
    res.render('settings/settingsIzdavac');
};

export const getPovez= async (req: Request, res: Response) => {
    res.render('settings/settingsPovez');
};

export const getPismo= async (req: Request, res: Response) => {
    res.render('settings/settingsPismo');
};

 */
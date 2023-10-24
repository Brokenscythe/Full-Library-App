import { db } from "../src/utils/db.server";
import {
  Author,
  Category,
  Binding,
  Format,
  Letter,
  Language,
  UserType,
  Book,
  UserGender,
  Publisher,
} from "./schema.prisma";

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          name: author.name,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      name: "William Shakespeare",
    },
  });

  /* await Promise.all(
    getCategories().map((category) => {
      return db.category.create({
        data: {
          name: category.name,
        },
      });
    })
  ); */

  await Promise.all(
    getBindings().map((binding) => {
      return db.binding.create({
        data: {
          name: binding.name,
        },
      });
    })
  );

  await Promise.all(
    getFormats().map((format) => {
      return db.format.create({
        data: {
          name: format.name,
        },
      });
    })
  );

  await Promise.all(
    getLetters().map((letter) => {
      return db.letter.create({
        data: {
          name: letter.name,
        },
      });
    })
  );

  await Promise.all(
    getLanguages().map((language) => {
      return db.language.create({
        data: {
          name: language.name,
        },
      });
    })
  );
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      name: "Stephen King",
    },
    {
      name: "William Shakespeare",
    },
    {
      name: "Ivo Andrić",
    },
    {
      name: "Haruki Murakami",
    },
  ];
}

/* function getCategories(): Array<Category> {
  return [
    {
      name: "Roman",
    },
    {
      name: "Udžbenik",
    },
    {
      name: "Horor",
    },
    {
      name: "Naučna fantastika",
    },
    {
      name: "Ljubavni",
    },
  ];
} */

function getBindings(): Array<Binding> {
  return [
    {
      name: "Tvrdi Povez",
    },
    {
      name: "Meki Povez",
    },
  ];
}

function getFormats(): Array<Format> {
  return [
    {
      name: "A3",
    },
    {
      name: "A4",
    },
    {
      name: "A5",
    },
  ];
}

function getLetters(): Array<Letter> {
  return [
    {
      name: "Ćirilica",
    },
    {
      name: "Latinica",
    },
  ];
}

function getLanguages(): Array<Language> {
  return [
    {
      name: "Crnogorski",
    },
    {
      name: "Srpski",
    },
    {
      name: "Engleski",
    },
    {
      name: "Ruski",
    },
    {
      name: "Francuski",
    },
  ];
}

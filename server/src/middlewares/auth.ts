import type { RequestHandler } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import userRepository from "../modules/userRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, //cout en memoire vive
  timeCost: 2, // combien de fois il est haché
  parallelism: 1, // nombre de coeurs utilisés pour le hachage
};

const hachPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    console.info(req.body);
    const { email, password } = req.body;

    const users = await userRepository.readByEmailWithPassword(email);

    if (!users) {
      res.sendStatus(422); // renvoi une erreur si l'email n'est pas bon
    }

    const verified = await argon2.verify(users.hashed_password, password);
    if (!verified) {
      res.sendStatus(422); // renvoi une erreur si le mot de passe n'est pas bon
    } else {
      const payload = {
        // ce qu'on stock à l'intérieur du token
        id: users.id,
        Nom: users.Nom,
        Prenom: users.Prenom,
        Email: users.Email,
        is_admin: users.is_admin,
      };

      if (!process.env.APP_SECRET) {
        throw new Error("Vous n'avez pas configuré votre APP_SECRET");
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y", // date d'expiration du token
      }); // création du token

      // token prêt à être envoyé au client

      console.info(token);

      res.cookie("auth", token).json({
        message: "Connexion réussie",
        is_admin: payload.is_admin,
        user_id: payload.id,
        Nom: payload.Nom,
        Prenom: payload.Prenom,
      }); //apparait dans les cookies sur postman le nom "auth" on l'appelle comme on veut

      res.send("utilisateur connecté");
    }

    // voir si l'email existe dans la bdd et en extraire les infos qui nous interesse
    // email existe
    // comparer le password qui provient du client à celui de la bdd
  } catch (error) {}
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    // si pas de process.env.APP_SECRET pas de try et de catch
    throw new Error("Vous n'avez pas configuré votre APP_SECRET");
  }
  try {
    // récupérer le token qui est à l'intérieur des cookies
    const { auth } = req.cookies;

    // si il y a pas de cookie on déclenche une erreur ..... auth = nom du cookie
    if (!auth) {
      res.sendStatus(403); // on vérifie si il y a un token
    }

    // on stock la vérification du token dans une variable .... verifie le token JWT qu'il y a à l'intérieur
    const result = await jwt.verify(auth, process.env.APP_SECRET);

    // si tout se passe bien next()

    if (typeof result !== "object") {
      throw new Error("Le token n'est pas au bon format");
    }

    req.user = {
      id: result.id,
      Email: result.Email,
      is_admin: result.is_admin,
    };

    next();
  } catch (error) {
    next(error); // si erreur on la transmet au middleware d'erreur
  }
};

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  if (!req.user.is_admin) {
    res.status(403).json({ message: "Accès refusé" });
  }

  next();
};

export default { checkIfAdmin, hachPassword, login, verify };

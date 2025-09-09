import type { RequestHandler } from "express";
import argon2 from "argon2";

import userRepository from "../modules/userRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, //cout en memoire vive
  timeCost: 2, // combien de fois il est haché
  parallelism: 1, // nombre de coeurs utilisés pour le hachage
};

const checkIfAdmin: RequestHandler = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    res.status(403).json({ message: "Accès refusé" });
    return;
  }

  next();
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
      res.send("utilisateur connecté");
    }

    // voir si l'email existe dans la bdd et en extraire les infos qui nous interesse
    // email existe
    // comparer le password qui provient du client à celui de la bdd
  } catch (error) {}
};

export default { checkIfAdmin, hachPassword, login };

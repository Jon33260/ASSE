import type { RequestHandler } from "express";

import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: req.body.id,
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      Email: req.body.Email,
      is_admin: req.body.is_admin,
    };

    const affectedRows = await userRepository.update(user);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      Nom: req.body.Nom,
      Prenom: req.body.Prenom,
      Email: req.body.Email,
      hashed_password: req.body.hashed_password,
      is_admin: req.body.is_admin,
    };

    const insertId = await userRepository.create(user);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);

    await userRepository.delete(userId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };

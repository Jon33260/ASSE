import type { RequestHandler } from "express";

import postRepository from "./postRepository";

// Récupérer tous les posts
const browse: RequestHandler = async (req, res, next) => {
  try {
    const posts = await postRepository.readAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Récupérer un post par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const post = await postRepository.read(postId);

    if (post == null) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  } catch (err) {
    next(err);
  }
};

// Modifier un post
const edit: RequestHandler = async (req, res, next) => {
  try {
    const post = {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      picture: req.body.picture,
      category: req.body.category,
      user_id: req.body.user_id,
    };

    const affectedRows = await postRepository.update(post);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

// Ajouter un nouveau post
const add: RequestHandler = async (req, res, next) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      picture: req.body.picture,
      category: req.body.category,
      user_id: req.body.user_id,
    };

    const insertId = await postRepository.create(post);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Supprimer un post
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number.parseInt(req.params.id);

    await postRepository.delete(postId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };

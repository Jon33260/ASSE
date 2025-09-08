import type { RequestHandler } from "express";
import supporterPhotoRepository from "./supporterPhotoRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const photos = await supporterPhotoRepository.readAll();
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const photoId = Number(req.params.id);
    const photo = await supporterPhotoRepository.read(photoId);

    if (!photo) {
      res.sendStatus(404);
    } else {
      res.json(photo);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, picture, category_id, user_id } = req.body;

    // Validation des champs obligatoires
    if (!title || !picture || !category_id || !user_id) {
      res.status(400).json({
        message: "title, picture, category_id et user_id sont requis",
      });
      return; // <-- TypeScript OK
    }

    const photo = {
      title,
      description: description || null,
      picture,
      category_id: Number(category_id),
      user_id: Number(user_id),
    };

    const insertId = await supporterPhotoRepository.create(photo);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const photo = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      picture: req.body.picture,
      category_id: req.body.category_id,
      user_id: req.body.user_id,
      created_at: req.body.created_at,
    };

    const affectedRows = await supporterPhotoRepository.update(photo);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const photoId = Number(req.params.id);

    const affectedRows = await supporterPhotoRepository.delete(photoId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, edit, destroy };

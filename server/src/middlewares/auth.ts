import type { RequestHandler } from "express";

const checkIfAdmin: RequestHandler = (req, res, next) => {
  if (!req.user.is_admin) {
    res.status(403).json({ message: "Accès refusé" });
  }

  next();
};

export default { checkIfAdmin };

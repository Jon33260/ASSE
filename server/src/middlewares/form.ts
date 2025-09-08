import type { RequestHandler } from "express";

import Joi from "joi";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;

const formSchema = Joi.object({
  Nom: Joi.string().min(5).alphanum().required().messages({
    "string.min": "le nom d'utilisateur doit contenir minimum 5 caractères",
    "string.alphanum": "Ne peut pas contenir de caractères spéciaux ",
    "any.required": "Nom d utilisateur requis",
  }),
  Prenom: Joi.string().min(5).alphanum().required().messages({
    "string.min": "le prénom d'utilisateur doit contenir minimum 3 caractères",
    "string.alphanum": "Ne peut pas contenir de caractères spéciaux ",
    "any.required": "Prénom d utilisateur requis",
  }),
  Email: Joi.string().email().required().messages({
    "string.email": "Veuillez entrer une adresse mail valide",
    "any.required": "Email requis",
  }),
  Password: Joi.string().pattern(PASSWORD_REGEX).required().messages({
    "string.pattern.base":
      "Le mot de passe doit contenir au moins une majuscule, minuscule, chiffre et caractère spécial",
    "string.min": "Le mot de passe doit contenir 8 caractères minimum",
    "any.required": "Mot de passe requis",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = formSchema.validate(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };

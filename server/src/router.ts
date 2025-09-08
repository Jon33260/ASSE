import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// User routes
import userActions from "./modules/userActions";
import form from "./middlewares/form";
import auth from "./middlewares/auth";

router.get("/api/users", auth.checkIfAdmin, userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", userActions.edit);
router.post("/api/users", form.validate, auth.hachPassword, userActions.add);
router.delete("/api/users/:id", userActions.destroy);

// Post routes
import postActions from "./modules/Post/postActions";

router.get("/api/posts", postActions.browse);
router.get("/api/posts/:id", postActions.read);
router.put("/api/posts/:id", postActions.edit);
router.post("/api/posts", postActions.add);
router.delete("/api/posts/:id", postActions.destroy);

// Supporter Photo routes
import supporterPhotoActions from "./modules/supporterPhotos/supporterPhotosActions";
import upload from "./middlewares/upload";

router.get("/api/supporter-photos", supporterPhotoActions.browse); // toutes les photos
router.get("/api/supporter-photos/:id", supporterPhotoActions.read); // photo par id
router.put("/api/supporter-photos/:id", supporterPhotoActions.edit); // modifier
router.post(
  "/api/supporter-photos",
  upload.uploadFile,
  supporterPhotoActions.add,
); // ajouter
router.delete("/api/supporter-photos/:id", supporterPhotoActions.destroy); // supprimer

export default router;

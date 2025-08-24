import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// User routes
import userActions from "./modules/userActions";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", userActions.edit);
router.post("/api/users", userActions.add);
router.delete("/api/users/:id", userActions.destroy);

// Post routes
import postActions from "./modules/Post/postActions";

router.get("/api/posts", postActions.browse);
router.get("/api/posts/:id", postActions.read);
router.put("/api/posts/:id", postActions.edit);
router.post("/api/posts", postActions.add);
router.delete("/api/posts/:id", postActions.destroy);

export default router;

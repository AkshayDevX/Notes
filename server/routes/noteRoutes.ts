import { AddNote, deleteNote, getNotesByUserId, updateNote } from "../controllers/noteControllers";
import {isAuthenticatedUser} from "./../middlewares/auth";
import express from "express";

const router = express.Router();

router.route("/user/add-note").post(isAuthenticatedUser, AddNote);
router.route("/user/note/edit").put(isAuthenticatedUser,updateNote);
router.route("/user/note/delete/:id").delete(isAuthenticatedUser, deleteNote);
router.route("/user/notes").get(isAuthenticatedUser, getNotesByUserId);

export default router;
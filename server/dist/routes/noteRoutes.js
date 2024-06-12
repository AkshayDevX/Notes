"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noteControllers_1 = require("../controllers/noteControllers");
const auth_1 = require("./../middlewares/auth");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route("/user/add-note").post(auth_1.isAuthenticatedUser, noteControllers_1.AddNote);
router.route("/user/note/edit").put(auth_1.isAuthenticatedUser, noteControllers_1.updateNote);
router.route("/user/note/delete/:id").delete(auth_1.isAuthenticatedUser, noteControllers_1.deleteNote);
router.route("/user/notes").get(auth_1.isAuthenticatedUser, noteControllers_1.getNotesByUserId);
exports.default = router;
//# sourceMappingURL=noteRoutes.js.map
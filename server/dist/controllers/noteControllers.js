"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesByUserId = exports.deleteNote = exports.updateNote = exports.AddNote = void 0;
const schema_1 = require("../db/schema");
const index_1 = __importDefault(require("../db/index"));
const catchAsyncErrors_1 = __importDefault(require("../utils/catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const drizzle_orm_1 = require("drizzle-orm");
// add note
exports.AddNote = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const Id = req.user.id;
    if (!title || !content) {
        return next(new errorHandler_1.default("Please enter all fields", 400));
    }
    const existingRecord = yield index_1.default
        .select()
        .from(schema_1.notes)
        .where((0, drizzle_orm_1.sql) `${schema_1.notes.title} = ${title}`);
    if (existingRecord.length > 0) {
        return next(new errorHandler_1.default("Note already exists", 400));
    }
    const newNote = yield index_1.default
        .insert(schema_1.notes)
        .values({ title, content, userId: Id })
        .returning();
    res.status(201).json({
        success: true,
        note: newNote[0],
    });
}));
// update note
exports.updateNote = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, noteId } = req.body;
    const Id = req.user.id;
    if (!title || !content) {
        return next(new errorHandler_1.default("Please enter all fields", 400));
    }
    const updatedNote = yield index_1.default
        .update(schema_1.notes)
        .set({ title, content })
        .where((0, drizzle_orm_1.sql) `${schema_1.notes.userId} = ${Id} AND ${schema_1.notes.id} = ${noteId}`)
        .returning();
    res.status(200).json({
        success: true,
        note: updatedNote[0],
    });
}));
// delete note
exports.deleteNote = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.user.id;
    const noteId = req.params.id;
    const decodedId = atob(noteId);
    yield index_1.default
        .delete(schema_1.notes)
        .where((0, drizzle_orm_1.sql) `${schema_1.notes.userId} = ${Id} AND ${schema_1.notes.id} = ${Number(decodedId)}`);
    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
    });
}));
// get notes by user id
exports.getNotesByUserId = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const userNotes = yield index_1.default
        .select()
        .from(schema_1.notes)
        .where((0, drizzle_orm_1.sql) `${schema_1.notes.userId} = ${id}`).orderBy((0, drizzle_orm_1.sql) `${schema_1.notes.createdAt} DESC`);
    res.status(200).json({
        success: true,
        userNotes,
    });
}));
//# sourceMappingURL=noteControllers.js.map
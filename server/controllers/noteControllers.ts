import { notes } from "../db/schema";
import db from "../db/index";
import catchAsyncErrors from "../utils/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { sql } from "drizzle-orm";

// add note
export const AddNote = catchAsyncErrors(async (req: any, res, next) => {
  const { title, content } = req.body;

  const Id = req.user.id;

  if (!title || !content) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const existingRecord = await db
    .select()
    .from(notes)
    .where(sql`${notes.title} = ${title}`);

  if (existingRecord.length > 0) {
    return next(new ErrorHandler("Note already exists", 400));
  }

  const newNote = await db
    .insert(notes)
    .values({ title, content, userId: Id })
    .returning();

  res.status(201).json({
    success: true,
    note: newNote[0],
  });
});

// update note
export const updateNote = catchAsyncErrors(async (req: any, res, next) => {
  const { title, content, noteId } = req.body;

  const Id = req.user.id;

  if (!title || !content) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const updatedNote = await db
    .update(notes)
    .set({ title, content })
    .where(sql`${notes.userId} = ${Id} AND ${notes.id} = ${noteId}`)
    .returning();

  res.status(200).json({
    success: true,
    note: updatedNote[0],
  });
});

// delete note
export const deleteNote = catchAsyncErrors(async (req: any, res, next) => {
  const Id = req.user.id;

  const noteId = req.params.id;
  const decodedId = atob(noteId);

  await db
    .delete(notes)
    .where(sql`${notes.userId} = ${Id} AND ${notes.id} = ${Number(decodedId)}`);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

// get notes by user id
export const getNotesByUserId = catchAsyncErrors(
  async (req: any, res, next) => {
    const id = req.user.id;

    const userNotes = await db
      .select()
      .from(notes)
      .where(sql`${notes.userId} = ${id}`).orderBy(sql`${notes.createdAt} DESC`);

    res.status(200).json({
      success: true,
      userNotes,
    });
  }
);

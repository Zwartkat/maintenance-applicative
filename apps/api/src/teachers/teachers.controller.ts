import prisma from "../client";
import { NextFunction, Request, Response } from "express";

export const getTeachers = async (_req: Request, res: Response) => {
  const professors = await prisma.professor.findMany();

  if (professors.length === 0)
    res
      .status(204)
      .send({ state: "success", statusCode: 204, message: "No decks found" });
  else res.status(200).send(professors);
};

export const vote = async (req: Request, res: Response) => {
  const teacherId = Number(req.params.teacherId);
  const userId = Number(req.params.userId);
  const voteType = req.params.voteType;

  if (voteType != "upvote" && voteType != "downvote") {
    return res.status(400).json({"status": 400,"message": 'Vote type is not "upvote" or "downvote"'});
  }

  if (
    isNaN(userId) ||
    await prisma.user.findUnique({ where: { id: userId } }) === null
  ) {
    return res.status(400).json({"status": 400, "message" : "Unknown user"});
  }

  if (
    isNaN(teacherId) ||
    await prisma.professor.findUnique({ where: { id: teacherId } }) === null
  ) {
    return res.status(400).json({"status": 400, "message": "Unknown teacher"});
  }

  // Add a new row if there is no row with provided user id and teacher id else row is updated with new vote
  try {
  await prisma.vote.upsert({
    where: {
      userId_professorId: {
        userId: userId,
        professorId: teacherId,
      },
    },
    update: {
      type: voteType === "upvote" ? "UPVOTE" : "DOWNVOTE",
    },
    create: {
      userId: userId,
      professorId: teacherId,
      type: voteType === "upvote" ? "UPVOTE" : "DOWNVOTE",
    },
  });
  return res.status(201).json({"status": 201})
}
  catch (err){
    return res.status(500).json({"status": 500, "message" : "An error occured while trying to create or update with this parameter"})
  }
};

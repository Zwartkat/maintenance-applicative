import prisma from "../client";
import { NextFunction, Request, Response } from "express";

export const getTeachers = async (_req: Request, res: Response) => {
  const professors = await prisma.professor.findMany({
    include: { vote: true },
  });

  if (professors.length === 0)
    res.status(204).send({ state: 204, message: "No teacher found" });
  else {
    // Calculate upVotes and downVotes for each professor
    const professorsWithVotes = professors.map((professor) => {
      const upVotes = professor.vote.filter((v) => v.state === true).length;
      const downVotes = professor.vote.filter((v) => v.state === false).length;
      return {
        ...professor,
        upVotes,
        downVotes,
      };
    });
    res.status(200).send(professorsWithVotes);
  }
};

export const vote = async (req: Request, res: Response) => {
  const teacherId = Number(req.query.teacher);
  const userId = Number(req.query.user);
  const vote = req.query.vote === "true";

  // // To prevent problems

  if (!vote){
    return res.status(403).json({status: 403,message: 'Why do you want to downvote a teacher ?'});
  }
  // Check if user exists

  if (
    isNaN(userId) ||
    (await prisma.user.findUnique({ where: { id: userId } })) === null
  ) {
    return res.status(400).json({ status: 400, message: "Unknown user" });
  }

  // Check if teacher exists

  if (
    isNaN(teacherId) ||
    (await prisma.professor.findUnique({ where: { id: teacherId } })) === null
  ) {
    return res.status(400).json({ status: 400, message: "Unknown teacher" });
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
        state: vote,
      },
      create: {
        userId: userId,
        professorId: teacherId,
        state: vote,
      },
    });
    return res
      .status(201)
      .json({ status: 201, message: "Successfully updated" });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message:
        "An error occured while trying to create or update with this parameter",
    });
  }
};

/**
 * Remove a vote. 
 * Require teacher id to unvote and user id who vote
 */
export const unvote = async (req: Request, res: Response) => {
  const teacherId = Number(req.query.teacher);
  const userId = Number(req.query.user);

  // Check if provided user exists
  if (
    isNaN(userId) ||
    (await prisma.user.findUnique({ where: { id: userId } })) === null
  ) {
    return res.status(400).json({ status: 400, message: "Unknown user" });
  }

  // Check if provided teacher exists
  if (
    isNaN(teacherId) ||
    (await prisma.professor.findUnique({ where: { id: teacherId } })) === null
  ) {
    return res.status(400).json({ status: 400, message: "Unknown teacher" });
  }

  // Delete vote if exists
  try {
    await prisma.vote.delete({
      where: {
        userId_professorId: {
          userId: userId,
          professorId: teacherId,
        },
      },
    });

    return res
      .status(201)
      .json({ status: 201, message: "Successfully delete" });
  } catch (err: any) {
    // Catch not found exception
    if (err.code === "P2025") {
      return res.status(404).json({
        status: 404,
        message: "No vote found",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to delete with this parameter",
    });
  }
};

/**
 * Get votes for a user by using his id
 */
export const getVoteById = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  // Check if provided user exists
  if (
    isNaN(userId) ||
    (await prisma.user.findUnique({ where: { id: userId } })) === null
  ) {
    return res.status(400).json({ status: 400, message: "Unknown user" });
  }

  try {
    const votes = await prisma.vote.findMany({
      where: { userId: userId },
      select: { state: true, professorId: true, userId: false },
    });
    if (votes.length === 0) {
      return res.status(202).json({ status: 202 });
    }
    return res.status(200).json(votes);
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "An internal error occured" });
  }
};

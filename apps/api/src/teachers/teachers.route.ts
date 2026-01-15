import { Router } from "express";

import { verifyJWT } from "../common/auth.middleware";
import { getTeachers, unvote, vote, getVoteById } from "./teachers.controller";

const teacherRouter = Router();

teacherRouter.get("/teachers", getTeachers);
teacherRouter.post("/vote",vote)
teacherRouter.delete("/unvote",unvote)
teacherRouter.get("/vote/:userId",getVoteById)

export { teacherRouter };

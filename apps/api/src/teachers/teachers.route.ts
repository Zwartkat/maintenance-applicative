import { Router } from "express";

import { verifyJWT } from "../common/auth.middleware";
import { getTeachers, vote } from "./teachers.controller";

const teacherRouter = Router();

teacherRouter.get("/teachers", getTeachers);
teacherRouter.get("/vote/:teacherId/:voteType/:userId",vote)

export { teacherRouter };

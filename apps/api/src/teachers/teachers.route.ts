import { Router } from "express";

import { verifyJWT } from "../common/auth.middleware";
import { getTeachers, unvote, vote } from "./teachers.controller";

const teacherRouter = Router();

teacherRouter.get("/teachers", getTeachers);
teacherRouter.post("/vote",vote)
teacherRouter.delete("/unvote",unvote)

export { teacherRouter };

import { User } from "@prisma/client";

export type LoginType = Pick<User, "email" | "password">;
export type UsersType = Partial<User>;
export type CrudUserParamsType = { id: string };

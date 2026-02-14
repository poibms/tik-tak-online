import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import cuid from "cuid";
import { passwordService } from "./password";
import { DEFAULT_RATING } from "../domain";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const isUserExists = await userRepository.getUser({ login });

  if (isUserExists) {
    return left("user-already-exists" as const );
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.saveUser({
    id: cuid(),
    login,
    rating: DEFAULT_RATING,
    passwordHash: hash,
    salt,
  });

  return right(user)
};

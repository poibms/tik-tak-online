'use server'
import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";
import { redirect } from "next/navigation";
import z from "zod";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  console.log(formData.get("login"));
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if(!result.success) {
    return left(`Validation error: ${result.error.message}`)
  }

  const createUserResult = await verifyUserPassword(result.data)

  if(createUserResult.type === 'right') {
    await sessionService.addSession(createUserResult.value)
    redirect('/')
  }

  return mapLeft(createUserResult, (error) => {
    return {
      "wrong-user-or-password": 'Wrong login or password'
    }[error]
  })
};

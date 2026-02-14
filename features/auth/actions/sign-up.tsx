"use server";
import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";
import z from "zod";

export type SignUpFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  console.log(formData.get("login"));
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);
  if (!result.success) {
    const formatedErrors = z.treeifyError(result.error);
    return {
      formData,
      errors: {
        login: formatedErrors.properties?.login?.errors.join(", "),
        password: formatedErrors.properties?.password?.errors.join(", "),
        _errors: formatedErrors.errors.join(", "),
      },
    };
  }

  const createUserResult = await createUser(result.data);
  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);
    redirect("/");
  }

  const errors = {
    "user-already-exists": "User already exist",
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};

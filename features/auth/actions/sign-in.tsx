'use server'
import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { redirect } from "next/navigation";
import z from "zod";

export type SignInFormState = {
  formData?: FormData,
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  }
}

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: SignInFormState, formData: FormData): Promise<SignInFormState> => {
  console.log(formData.get("login"));
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if(!result.success) {
    const formatedErrors = z.treeifyError(result.error);
    return {
      formData,
      errors: {
        login: formatedErrors.properties?.login?.errors.join(', '),
        password: formatedErrors.properties?.password?.errors.join(', '),
        _errors: formatedErrors.errors.join(', ')
      }
    }
  }

  const verifyUserResult = await verifyUserPassword(result.data)

  if(verifyUserResult.type === 'right') {
    await sessionService.addSession(verifyUserResult.value)
    redirect('/')
  }

  const errors = {
    'wrong-user-or-password': "Wrong user of password",
  }[verifyUserResult.error]

  return {
    formData,
    errors: {
      _errors: errors
    }
  }
};

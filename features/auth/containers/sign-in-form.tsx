'use client'
import { right } from "@/shared/lib/either";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/bottom-link";
import { useState } from "react";
import { ErrorMessage } from "../ui/error-message";

export function SignInForm() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => {};
  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      onSubmit={handleSubmit}
      fields={
        <AuthFields
          login={login}
          onChangeLogin={setLogin}
          onChangePassword={setPassword}
          password={password}
        />
      }
      actions={<SubmitButton>Sign Up </SubmitButton>}
      error={<ErrorMessage error={right(null)} />}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url="/sign-up"
        />
      }
    />
  );
}

import SignInFormProvider from "@/components/forms/sign-in/form-provider";
import LoginForm from "@/components/forms/sign-in/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 max-w-[700px] justify-center items-center self-center">
      <div className="flex flex-col h-full gap-3 border border-violet-700 backdrop-blur-3xl bg-black/300 rounded-xl px-16 py-28">
        <SignInFormProvider>
          <div className="flex flex-col gap-8">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button
                type="submit"
                className="w-full bg-violet-700 text-white hover:bg-violet-800"
              >
                Submit
              </Button>
              <p>
                Don’t have an account?{" "}
                <Link href="/auth/sign-up" className="font-bold">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignInPage;

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { icons } from "@/routes/(public)/_guest/sign-up/-components/icons";
import { SignUpScreen } from "@/routes/(public)/_guest/sign-up/-components/sign-up-screen.tsx";
import { useSetIsLoggedIn } from "@/stores";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const navigate = useNavigate();
  const setIsLoggedIn = useSetIsLoggedIn;
  useEffect(() => {
    if (hasSignedUp) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate({ to: "/e-commerce", search: { sortBy: null, order: null, search: "" } });
        }, 1000);
      }, 2000);
    }
  }, [hasSignedUp, setIsLoggedIn]);

  return (
    <div className="relative mr-3 flex h-full w-full max-w-full">
      <icons.CompanyIcon className="absolute top-3 left-9 z-10 h-40 w-40 md:-top-2 md:h-32 md:w-32" />
      <div className="hidden h-screen w-3/5 justify-self-end overflow-hidden md:block">
        <img
          alt="Man with a computer and a colorful background"
          className="h-full w-full object-cover object-center"
          src="../../../../../public/big-image.jpg"
        />
      </div>
      {!hasSignedUp && <SignUpScreen setHasSignedUp={setHasSignedUp} />}
      {hasSignedUp && !isLoading ? (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-main font-ubuntu text-3xl font-medium text-red-700 md:w-2/5">
          <icons.PartyIcon />
          <div className="flex w-auto flex-col gap-1 text-center">
            <h1>Great!</h1>
            <h1>You signed in</h1>
          </div>
        </div>
      ) : null}
      {hasSignedUp && isLoading ? (
        <div className="flex h-screen w-full items-center justify-center justify-items-center bg-main align-middle md:w-2/5">
          <icons.SpinnerIcon className="size-25" />
        </div>
      ) : null}
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/sign-up/")({ component: RegisterPage });

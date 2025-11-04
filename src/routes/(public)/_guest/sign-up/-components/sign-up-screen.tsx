import { SignUpForm } from "./sign-up-form.tsx";

type SignUpScreenProps = { setHasSignedUp: (hasSignedUp: boolean) => void };
export const SignUpScreen = ({ setHasSignedUp }: SignUpScreenProps) => (
  <div className="flex w-full flex-col justify-items-start gap-10 bg-main pt-40 pr-10 pl-10 text-start text-project-gray md:w-2/5 md:pt-20 md:pl-20">
    <div className="flex flex-col gap-5">
      <h1 className="h-auto w-full justify-self-start font-ubuntu text-2xl font-semibold">
        Sign up
      </h1>
      <div className="flex w-full flex-col gap-1 font-manrope">
        <p className="text-md h-auto w-full font-normal">If you already have an account register</p>
        <p className="text-md h-auto w-full font-normal">
          You can
          <a className="text-red-500" href="/public">
            {" "}
            Login here!
          </a>
        </p>
      </div>
    </div>
    <SignUpForm setHasSignedUp={setHasSignedUp} />
  </div>
);

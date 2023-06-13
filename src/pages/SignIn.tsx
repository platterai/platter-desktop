// ---------- REACT/NEXT ----------
import { useEffect } from "react";
// ---------- COMPONENTS ----------
import Logo from "../components/Logo";
import SignInForm from "../components/Forms/SignInForm";
import TextDivider from "../components/CustomUI/TextDivider";
import GoogleButton from "../components/CustomUI/AuthLoginButton/GoogleButton";
// ---------- HELPERS ----------
import { signInWindow } from "../constants/windowSizes";
import { setWindowCenter, setWindowSize } from "../util/helpers";

export default function SignInPage() {
  useEffect(() => {
    setWindowSize(signInWindow.w, signInWindow.h);
    setWindowCenter();
    return () => {};
  }, []);

  return (
    <div className='bg-white w-full py-10 center-col rounded-lg'>
      <div className='center-col' style={{ width: "320px" }}>
        <Logo />

        <div className='center-col gap-4 my-10 w-full'>
          <p>Sign in to Platter</p>
          <GoogleButton />
          <TextDivider>OR</TextDivider>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

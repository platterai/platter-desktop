import React, { useContext, useEffect, useState } from "react";
import Divider from "../components/CustomUI/Divider";
import Flex from "../components/CustomUI/Flex";
import Logo from "../components/Logo";
import SignInForm from "../components/SignInForm";
import PageContext from "../context/PageContext";
import { requestGet } from "../services/baseService";
import { btn_stroke_light } from "../styles/custom-components-classes";
import { anchorLink, checkCookie, setWindowSize } from "../util/helpers";

export default function SignInPage() {
  const { setPage } = useContext(PageContext)!;
  const [loading, setLoading] = useState(true);
  const handleGoogleOauth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const responseData = await requestGet<any>("/v1/google/auth", {});
      console.log({ responseData });
      if (responseData?.statusCode === 200) {
        anchorLink(responseData?.data?.url, true);
      } else {
        alert("Google Authentication Error");
      }
    } catch (error) {
      console.error({ error });
      alert("Google Authentication Error");
    }
  };

  useEffect(() => {
    setWindowSize(500, 540);
    if (checkCookie("token")) {
      setPage("chat");
      setLoading(false);
    } else {
      setLoading(false);
    }
    return () => {};
  }, []);

  return (
    <div
      className='bg-white w-full py-10 center-col '
      style={{ borderRadius: "8px", display: loading ? "none" : "block" }}
    >
      <div className='center-col ' style={{ width: "320px" }}>
        <Logo />

        <div className='center-col gap-4  my-10 w-full'>
          <p>Sign in to Platter</p>
          <button className={`${btn_stroke_light}`} onClick={handleGoogleOauth}>
            <img src='/images/google.svg' width={24} height={24} alt='google' />
            <p className=''>Continue with Google</p>
          </button>
          <Flex direction='row' gap='16px'>
            <Divider />
            <p>OR</p>
            <Divider />
          </Flex>

          <SignInForm />
        </div>
      </div>
    </div>
  );
}

import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import Divider from "../components/CustomUI/Divider";
import Flex from "../components/CustomUI/Flex";
import Logo from "../components/Logo";
import Settings from "../components/Settings";
import SignInForm from "../components/SignInForm";
import { settings } from "../constants/settings";
import PageContext from "../context/PageContext";
import { requestGet } from "../services/baseService";
import { btn_stroke_light } from "../styles/custom-components-classes";
import { anchorLink, checkCookie, setWindowSize } from "../util/helpers";

export default function SettingsPage() {
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
    setWindowSize(790, 600);
    return () => {};
  }, []);

  return (
    <div
      className='bg-white w-full py-10 px-12 flex flex-col'
      style={{ borderRadius: "8px", display: loading ? "none" : "block" }}
    >
      <p className='text-2xl font-bold mb-4 ml-3'>
        <ArrowBackIcon
          className='mr-3 cursor-pointer'
          sx={{ transform: "translateY(-2px)" }}
          onClick={() => {
            setPage("chat");
          }}
        />
        Settings
      </p>
      <Settings items={settings} />
    </div>
  );
}

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import Settings from "../components/Settings";
import { settings } from "../constants/settings";
import PageContext from "../context/PageContext";
import { setWindowCenter, setWindowSize } from "../util/helpers";

export default function SettingsPage() {
  const { setPage } = useContext(PageContext)!;

  useEffect(() => {
    setWindowSize(790, 600);
    setWindowCenter();
    return () => {};
  }, []);

  return (
    <div className='bg-white w-full py-10 px-12 flex flex-col rounded-lg'>
      <div className='flex flex-row items-center gap-3 mb-4 ml-3 text-2xl font-bold text-n-6'>
        <ArrowBackIcon
          className='cursor-pointer'
          onClick={() => {
            setPage("chat");
          }}
        />
        <p className=''>Settings</p>
      </div>
      <Settings items={settings} />
    </div>
  );
}

import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import EditProfile from "../components/Profile/EditProfile";
import PageContext from "../context/PageContext";
import { setWindowSize } from "../util/helpers";

type ProfileProps = {};

export default function ProfilePage({}: ProfileProps) {
  const { setPage } = useContext(PageContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWindowSize(790, 600);
    return () => {};
  }, []);
  return (
    <div className='settingsInnerWrapper'>
      <div className='settingsContentWrapper no-scrollbar'>
        <div
          className='bg-white w-full py-10 px-12 flex flex-col'
          style={{ borderRadius: "8px", display: loading ? "none" : "block" }}
        >
          <div className='flex flex-row items-center gap-3 mb-4 ml-3 text-2xl font-bold text-n-6'>
            <ArrowBackIcon
              className='cursor-pointer'
              onClick={() => {
                setPage("chat");
              }}
            />
            <p className=''>Profile</p>
          </div>
          <EditProfile />
        </div>
      </div>
    </div>
  );
}

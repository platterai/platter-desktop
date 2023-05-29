import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import EditProfile from "./EditProfile";

type ProfilePopUpType = {
  id: string;
  title: string;
  icon: string;
};

type ProfilePopUpProps = {
  items: ProfilePopUpType[];
  activeItem?: number;
  setVisibleProfile?: (x: any) => void;
};

const ProfilePopUp = ({
  items,
  activeItem,
  setVisibleProfile,
}: ProfilePopUpProps) => {
  return (
    <div className='p-12 lg:px-8 md:pt-16 md:px-5 md:pb-8'>
      <div className='flex md:block'>
        <div className='grow '>
          <EditProfile setVisibleProfile={setVisibleProfile} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;

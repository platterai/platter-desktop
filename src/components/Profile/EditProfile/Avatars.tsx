import { serialize } from "cookie";
import React from "react";

type AvatarsProps = { setOpenAvatars: (e: boolean) => void };

let avatarLinks = [
  { path: "/images/avatars/avatar1.png" },
  { path: "/images/avatars/avatar2.png" },
  { path: "/images/avatars/avatar3.png" },
  { path: "/images/avatars/avatar4.png" },
  { path: "/images/avatars/avatar5.png" },
  { path: "/images/avatars/avatar6.png" },
  { path: "/images/avatars/avatar7.png" },
  { path: "/images/avatars/avatar8.png" },
  { path: "/images/avatars/avatar9.png" },
  { path: "/images/avatars/avatar10.png" },
  { path: "/images/avatars/avatar11.png" },
  { path: "/images/avatars/avatar12.png" },
  { path: "/images/avatars/avatar13.png" },
  { path: "/images/avatars/avatar14.png" },
  { path: "/images/avatars/avatar15.png" },
];

export default function Avatars({ setOpenAvatars }: AvatarsProps) {
  return (
    <div className='w-full py-20 px-12'>
      <p className='text-center mb-10 text-3xl'>Pick An Avatar</p>
      <div className='grid grid-cols-5 gap-4'>
        {avatarLinks?.map((item, index) => {
          return (
            <div
              key={index}
              className='col-span-1 cursor-pointer'
              onClick={() => {
                localStorage.setItem("selectedAvatarPath", item?.path);
                setOpenAvatars(false);
              }}
            >
              <img src={item?.path} alt='avatar' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

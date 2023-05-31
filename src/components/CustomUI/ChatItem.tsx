import React from "react";

type ChatItemProps = {
  isUser?: boolean;
  children: React.ReactNode;
};

export default function ChatItem({ isUser, children }: ChatItemProps) {
  return (
    <div className='flex flex-row gap-4 text-n-6 px-4 py-2 items-start'>
      <img
        className='w-10 rounded-lg'
        src={
          isUser
            ? "/images/avatars/avatar13.png"
            : "/images/logo/platter-logo-inverted-large.png"
        }
        alt='avatar'
      />{" "}
      <p className='bg-white px-4 py-2 rounded'>{children}</p>
    </div>
  );
}

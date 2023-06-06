import React from "react";

type ChatItemProps = {
  isUser?: boolean;
  children: React.ReactNode;
};

export default function ChatItem({ isUser, children }: ChatItemProps) {
  const messageWrapper = (bg: string) => {
    return (
      <div className={`${bg} rounded-2xl px-6 py-6 w-full`}>
        <p className='text-n-6'>{children}</p>
      </div>
    );
  };

  const imgComponent = (path: string, position: string, border: string) => {
    return (
      <img
        className={`w-10 h-10 rounded-xl bg-primary-1 absolute z-100 border-4 border-solid ${border} ${position}`}
        src={path}
        alt='avatar'
      />
    );
  };

  const platterChat = () => {
    return (
      <div className='relative mr-44'>
        {imgComponent(
          "/images/logo/platter-logo-inverted-large.png",
          "neg-bottom-6 left-4",
          "border-g-1"
        )}
        {messageWrapper("bg-g-1")}
      </div>
    );
  };

  const userChat = () => {
    return (
      <div className='relative ml-44'>
        {messageWrapper("bg-white")}
        {imgComponent(
          "/images/avatars/avatar13.png",
          "neg-bottom-6 right-4",
          "border-white"
        )}
      </div>
    );
  };

  if (isUser) {
    return userChat();
  } else {
    return platterChat();
  }
}

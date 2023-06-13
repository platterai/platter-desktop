import React from "react";
import { IMessage } from "../../types/app";
import SourceFile from "./SourceFile";

type ChatItemProps = {
  isUser?: boolean;
  item?: IMessage;
  children: React.ReactNode;
};

export default function ChatItem({ isUser, item, children }: ChatItemProps) {
  const docsList = item?.metadata?.docs;
  console.log(`item di ChatItem`, { docsList });
  const messageWrapper = (bg: string) => {
    return (
      <div className={`${bg} rounded-2xl px-6 py-6 w-full`}>
        <p className='text-n-6'>{children}</p>
        <p className='text-sm mt-4 mb-2'>Sources: </p>
        <div className='flex flex-row gap-3 flex-wrap'>
          {docsList?.length && docsList?.length > 0 ? (
            docsList?.map((doc, index) => {
              return (
                <SourceFile
                  key={index}
                  type={doc?.location}
                  fileName={doc?.fileName}
                  url={doc?.url}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const imgComponent = (path: string, position: string, border: string) => {
    return (
      <img
        className={`w-10 h-10 rounded-xl bg-primary-1 absolute z-100 border-2 border-solid ${border} ${position}`}
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
        {messageWrapper("border-2 border-solid border-n-3")}
        {imgComponent(
          "/images/avatars/avatar13.png",
          "neg-bottom-6 right-4",
          "border-n-3"
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

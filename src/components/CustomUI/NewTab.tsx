import React, { ReactNode } from "react";

type NewTabProps = {
  children: ReactNode;
  inline?: boolean;
  cN?: string;
  link: string;
};

export default function NewTab({
  link,
  inline = true,
  cN,
  children,
}: NewTabProps) {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className={`${
        inline ? "inline-block" : "flex"
      } gap-2 leading-none cursor-pointer ${cN}`}
    >
      {children}
    </a>
  );
}

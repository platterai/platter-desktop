import { ReactNode } from "react";
import Divider from "./Divider";
import Flex from "./Flex";

type TextDividerProps = {
  children: ReactNode;
};

export default function TextDivider({ children }: TextDividerProps) {
  return (
    <Flex direction='row' gap='16px'>
      <Divider />
      <p>{children}</p>
      <Divider />
    </Flex>
  );
}

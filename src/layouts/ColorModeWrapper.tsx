import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type ColorModeWrapperProps = {
  children: React.ReactNode;
};

export default function ColorModeWrapper({ children }: ColorModeWrapperProps) {
  const colormode = useSelector((state: any) => state?.colormode?.colormode);
  useEffect(() => {
    if (colormode === "") {
      localStorage.setItem("colormode", "light");
    } else {
      localStorage.setItem("colormode", colormode);
    }
    return () => {};
  }, [colormode]);
  return <div style={{ height: "100vh" }}>{children}</div>;
}

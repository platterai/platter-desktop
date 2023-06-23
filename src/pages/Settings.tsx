import { ArrowBackIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Settings from "../components/Settings";
import { settings } from "../constants/settings";
import PageContext from "../context/PageContext";
import { setWindowCenter, setWindowSize } from "../util/helpers";

export default function SettingsPage() {
  const { setPage } = useContext(PageContext)!;

  const colormode = useSelector((state: any) => state?.colormode?.colormode);

  useEffect(() => {
    setWindowSize(790, 600);
    setWindowCenter();
    return () => {};
  }, []);

  return (
    <div
      className={`${
        colormode === "dark" ? "bg-n-7 text-n-7" : "bg-white text-n-7"
      } w-full py-10 px-12 flex flex-col rounded-lg`}
    >
      <div style={{ height: "0px" }} id={`thePlotlyDiv`} />
      <div
        className={`flex flex-row items-center gap-3 mb-4 ml-3 text-2xl font-bold`}
      >
        <ArrowBackIcon
          className={`cursor-pointer ${
            colormode === "dark" ? "text-n-1" : "text-n-7"
          }`}
          onClick={() => {
            setPage("chat");
          }}
        />
        <p className={`${colormode === "dark" ? "text-n-1" : "text-n-7"}`}>
          Settings
        </p>
      </div>
      <Settings items={settings} />
    </div>
  );
}

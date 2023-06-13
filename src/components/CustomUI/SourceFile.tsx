import { Tooltip } from "@chakra-ui/react";
import { truncateFileName } from "../../util/helpers";
import NewTab from "./NewTab";

type SourceFileProps = {
  type: string;
  fileName: string;
  url: string;
};

// {
//   "url": "https://docs.google.com/document/d/1WQpPnoqqZRbAcjyFkMXIhYBs68ZifNbbrJ_8vxycrKQ/edit?usp=drivesdk",
//   "fileName": "PRIVACY POLICY",
//   "location": "google-drive",
//   "webDocId": "1WQpPnoqqZRbAcjyFkMXIhYBs68ZifNbbrJ_8vxycrKQ"
// }

export default function SourceFile({ type, fileName, url }: SourceFileProps) {
  const imgProps = {
    width: 16,
    height: 16,
  };

  const sourceLogo = () => {
    switch (type) {
      case "google-drive":
        return {
          src: "/images/integrations/google-drive.svg",
          alt: "google-drive",
        };
      case "onedrive":
        return {
          src: "/images/integrations/one-drive.svg",
          alt: "one-drive",
        };
      case "confluence":
        return {
          src: "/images/integrations/confluence.svg",
          alt: "confluence",
        };
      case "mysql":
        return {
          src: "/images/integrations/mysql.svg",
          alt: "mysql",
        };
      case "notion":
        return {
          src: "/images/integrations/notion.svg",
          alt: "notion",
        };
      case "notion":
        return {
          src: "/images/integrations/postgresql.svg",
          alt: "postgresql",
        };
      default:
        return {
          src: "",
          alt: "none",
        };
        break;
    }
  };

  return (
    <NewTab
      link={url ?? "/"}
      cN='bg-white shadow-sm hover:shadow-md px-4 py-2 rounded-full flex flex-row items-center gap-3 w-fit max-w-[600px] break-all leading-6'
    >
      <img src={sourceLogo()?.src} alt={sourceLogo()?.alt} {...imgProps} />{" "}
      <Tooltip label={fileName} placement='top'>
        <span>{truncateFileName(fileName)}</span>
      </Tooltip>
    </NewTab>
  );
}

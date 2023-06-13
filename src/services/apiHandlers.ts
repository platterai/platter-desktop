import { toast } from "react-hot-toast";
import { anchorLink } from "../util/helpers";
import { requestGet } from "./baseService";

export const handleGoogleOauth = async (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.preventDefault();

  try {
    const responseData = await requestGet<any>("/v1/google/auth", {});
    console.log({ responseData });
    if (responseData?.statusCode === 200) {
      anchorLink(responseData?.data?.url, true);
    } else {
      toast.error("Google Authentication Error");
    }
  } catch (error) {
    console.error({ error });
    toast.error("Google Authentication Error");
  }
};

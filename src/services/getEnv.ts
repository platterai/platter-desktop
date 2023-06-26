import { invoke } from "@tauri-apps/api/tauri";
import { toast } from "react-hot-toast";

type EnvTypes = {
  VITE_API_URL: string;
  VITE_API_SOCKET: string;
  VITE_API_SOCKET2: string;
};

export async function getEnv(): Promise<EnvTypes> {
  try {
    const envMain = "VITE_API_URL";
    const envSocket1 = "VITE_API_SOCKET";
    const envSocket2 = "VITE_API_SOCKET2";

    const VITE_API_URL: string = await invoke("get_env", {
      env: envMain,
    });
    const VITE_API_SOCKET: string = await invoke("get_env", {
      env: envSocket1,
    });
    const VITE_API_SOCKET2: string = await invoke("get_env", {
      env: envSocket2,
    });

    const env = {
      VITE_API_URL,
      VITE_API_SOCKET,
      VITE_API_SOCKET2,
    };

    console.log("getEnv() ---->", { env });
    return env;
  } catch (error: unknown) {
    console.error("getEnv() ERROR---->", { error });
    toast.error(error as string);
    return {
      VITE_API_URL: "",
      VITE_API_SOCKET: "",
      VITE_API_SOCKET2: "",
    };
  }
}

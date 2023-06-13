import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { IMessage } from "../../types/app";

type ChatActionsProps = {
  item: IMessage | undefined;
};

const ChatActions = ({ item }: ChatActionsProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [archive, setArchive] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const onCopy = () => {
    setCopied(true);
    toast.success("Content Copied!");
  };

  const styleButton: string =
    "h-6 ml-3 px-2 bg-n-3 rounded-md caption1 text-n-6 transition-colors hover:text-primary-1 dark:bg-n-7";

  return (
    <>
      <CopyToClipboard text={item?.message ?? "..."} onCopy={onCopy}>
        <button className={`${styleButton} md:hidden`}>Copy</button>
      </CopyToClipboard>
      {/* <button className={styleButton}>Regenerate response</button> */}
      {/* {!share && !archive && (
                <div className="flex ml-3 px-1 space-x-1 bg-n-3 rounded-md md:hidden dark:bg-n-7">
                    <button className="" onClick={() => setShare(true)}>
                        <Image
                            src="/images/smile-heart-eyes.png"
                            width={24}
                            height={24}
                            alt="Smile heart eyes"
                        />
                    </button>
                    <button className="" onClick={() => setArchive(true)}>
                        <Image
                            src="/images/smile-unamused.png"
                            width={24}
                            height={24}
                            alt="Smile unamused"
                        />
                    </button>
                </div>
            )} */}
      {/* {share && (
                <button
                    className={`flex items-center ${styleButton} pl-1 md:hidden`}
                    onClick={() => setVisibleModal(true)}
                >
                    <Image
                        src="/images/smile-heart-eyes.png"
                        width={24}
                        height={24}
                        alt="Smile heart eyes"
                    />
                    Share
                </button>
            )} */}
      {/* {archive && (
                <button
                    className={`flex items-center ${styleButton} pl-1 md:hidden`}
                    onClick={handleClick}
                >
                    <Image
                        src="/images/smile-unamused.png"
                        width={24}
                        height={24}
                        alt="Smile unamused"
                    />
                    Archive chat
                </button>
            )} */}
      {/* <ModalShareChat
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            /> */}
    </>
  );
};

export default ChatActions;

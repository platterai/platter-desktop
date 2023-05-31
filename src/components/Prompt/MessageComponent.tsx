import { useEffect, useState } from "react";
import { ChangeEventHandler } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { requestGet } from "../../services/baseService";
import {
  MentionsInputStyle,
  MentionsStyle,
} from "../../styles/mentionComponent";

type MessageComponentProps = {
  value: any;
  token: any;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onEnter?: () => void;
  hasMentions?: boolean;
};

const MessageComponent = ({
  value,
  token,
  onChange,
  onEnter,
  hasMentions = true,
}: MessageComponentProps) => {
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [mention, setMention] = useState<string>("");
  const onChangeMention = (e: any, f: any) => {
    if (f !== "\n") {
      onChange(f);
      const regex = /\/\/(\w+)/;
      const match = f.match(regex);
      if (match) {
        const mentionValue = match[1];
        setMention(mentionValue);
      } else {
        setMention("");
      }
    }
  };
  let container;

  const getDocuments = async (search: string) => {
    try {
      const params = {
        take: 6,
        skip: 1,
        search: search ?? "",
      };
      const responseData = await requestGet<any>("/v1/documents", {
        params,
        token,
      });
      if (responseData?.statusCode === 200) {
        setDocuments(
          responseData?.data.map(function (item: any) {
            return { ...item, display: item.docName };
          })
        );
      }
      console.log({ responseData });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    getDocuments("");

    return () => {};
  }, []);

  useEffect(() => {
    getDocuments(mention);
    return () => {};
  }, [mention]);

  return (
    <div
      ref={(el) => {
        container = el;
      }}
      className='mentionWrapper'
    >
      <MentionsInput
        value={value}
        placeholder='Type your prompt'
        onChange={onChangeMention}
        style={MentionsInputStyle}
        forceSuggestionsAboveCursor={false}
        suggestionsPortalHost={container}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            if (onEnter) {
              onEnter();
            }
          }
        }}
      >
        <Mention
          trigger={hasMentions ? "//" : "doNotTriggerAnythingThisTime"}
          markup='#(__display__[__id__])'
          data={documents}
          displayTransform={(id, display) => `${display}`}
          style={MentionsStyle}
        />
      </MentionsInput>
    </div>
  );
};

export default MessageComponent;

import { merge } from "lodash";
import { useContext, useEffect, useState } from "react";
import { ChangeEventHandler } from "react";
import { Mention, MentionsInput } from "react-mentions";
import UserContext from "../../context/UserContext";
import { requestGet } from "../../services/baseService";
import defaultMentionStyle from "../../styles/defaultMentionStyle";
import defaultStyle from "../../styles/defaultStyle";
import {
  MentionsInputStyle,
  MentionsStyle,
} from "../../styles/mentionComponent";

type MessageComponentProps = {
  value: any;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onEnter?: () => void;
  hasMentions?: boolean;
};

const MessageComponent = ({
  value,
  onChange,
  onEnter,
  hasMentions = true,
}: MessageComponentProps) => {
  let container;
  const contextValue = useContext(UserContext);
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [mention, setMention] = useState<string>("");

  let style = merge({}, defaultStyle, {
    input: {
      color: "black",
      overflow: "auto",
      height: 70,
    },
    highlighter: {
      boxSizing: "border-box",
      overflow: "hidden",
      height: 70,
    },
  });

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

  const getDocuments = async (search: string) => {
    try {
      const params = {
        take: 6,
        skip: 1,
        search: search ?? "",
        userId: contextValue?.user?.id,
      };
      const responseData = await requestGet<any>("/v1/documents", {
        params,
      });
      if (responseData?.statusCode === 200) {
        setDocuments(
          responseData?.data.map(function (item: any) {
            return { ...item, display: item.docName };
          })
        );
      }
    } catch (error) {
      console.error("getDocuments --->", { error });
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
      className='mentionWrapper '
    >
      {/* <MentionsInput
        singleLine={false}
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
      </MentionsInput> */}

      <MentionsInput
        value={value}
        onChange={onChangeMention}
        style={style}
        placeholder='Type your prompt'
        forceSuggestionsAboveCursor={true}
        suggestionsPortalHost={container}
        a11ySuggestionsListLabel={"Document List"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            if (onEnter) {
              onEnter();
            }
          }
        }}
      >
        <Mention
          markup='#(__display__^&&__id__&&^)'
          trigger='//'
          data={documents}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div className='user'>{highlightedDisplay}</div>
          )}
          displayTransform={(id, display) => `${display}`}
          style={defaultMentionStyle}
        />
      </MentionsInput>
    </div>
  );
};

export default MessageComponent;

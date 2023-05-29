export const MentionsInputStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    color: "#151718",
    borderRadius: "8px",
    height: 48,
  },

  "&multiLine": {
    control: {
      minHeight: 48,
    },
    highlighter: {
      padding: 16,
      border: "1px solid transparent",
    },
    input: {
      padding: "8px 16px",
      color: "#232627",
      border: "2px solid #fff",
      borderRadius: "8px",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      borderRadius: 8,
      fontSize: 18,
    },
    item: {
      padding: "10px 16px",
      // borderBottom: "1px solid rgba(0,0,0,0.15)",
      borderRadius: 8,
      "&focused": {
        backgroundColor: "#E6EFFF",
      },
    },
  },
};

export const MentionsStyle = {
  position: "relative",
  zIndex: 101,
  top: "-7px",
  left: "1px",
  color: "#6874EB",
  textShadow:
    "1px 1px 0px white, 1px -1px 0px white, -1px 1px 0px white, -1px -1px 0px white",
  textDecoration: "underline",
  pointerEvents: "none",
  maxHeight: "200px !important",
  overflowY: "scroll",
};

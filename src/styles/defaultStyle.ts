export default {
  control: {
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      minHeight: 63,
      maxHeight: 103,
      borderRadius: "8px",
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      // border: "1px solid green",
      border: "none",
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
      fontSize: 16,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

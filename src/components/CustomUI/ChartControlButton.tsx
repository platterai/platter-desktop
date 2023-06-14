import React, { ReactNode } from "react";

type ChartControlButtonProps = {
  children: ReactNode;
  toggle: boolean;
  handleClick: () => void;
};

export default function ChartControlButton({
  toggle,
  handleClick,
  children,
}: ChartControlButtonProps) {
  return (
    <button
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid",
        borderColor: "",
        borderRadius: 8,
        padding: "6px 10px",
        textTransform: "uppercase",
        fontSize: 12,
        zIndex: 2,
        color: toggle ? "white" : "purple",
        background: toggle
          ? "linear-gradient(to bottom right, #ff6361, #bc5090)"
          : "white",
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </button>
  );
}

import React, { useContext } from "react";
import PageContext from "../context/PageContext";

type ProfileProps = {};

export default function ProfilePage({}: ProfileProps) {
  const { setPage } = useContext(PageContext)!;
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        color: "var(--n-6)",
        padding: "24px 32px",
      }}
    >
      <p>Profile Page</p>
      <p>Work In Progress</p>
      <button
        onClick={() => {
          setPage("chat");
        }}
      >
        Back to chat
      </button>
    </div>
  );
}

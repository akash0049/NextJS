import React from "react";
import Navbar from "./navbar";

export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

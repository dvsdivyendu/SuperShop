// common/Layout.jsx
import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "44px", paddingBottom: "44px" }} className="min-h-screen pt-[44px] pb-[44px] p-4">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

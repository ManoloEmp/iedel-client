import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "./head";
import "../styles.css";

const Layout = (props) => {
  console.log("props en lay", props);
  return (
    <>
      <Head {...props} />
      <Header {...props} />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;

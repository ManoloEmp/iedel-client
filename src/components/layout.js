import * as React from "react";
import HeaderAlt from "./header_alt";
import Header from "./header";
import Footer from "./footer";
import Head from "./head";
import "../styles.css";

const Layout = (props) => {
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

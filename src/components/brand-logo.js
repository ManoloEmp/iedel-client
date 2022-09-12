import * as React from "react";
import logo from "../../public/Logo-Institucion-de-lena.png";

export default function GatsbyWordpressLogo() {
  return (
    <img
      src={logo}
      alt="Logo"
      sizes="(max-width: 427px) 100vw, 427px"
      width="25%"
      height="25%"
    />
  );
}

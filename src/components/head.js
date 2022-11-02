import * as React from "react";
import { Helmet } from "react-helmet";
// { title, description, image, ...args }

export default function Head(props) {
  console.log("args data", props);

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-us",
      }}
    >
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      {props.description && (
        <meta
          name="description"
          property="og:description"
          content={props.description}
        />
      )}
      <meta property="og:title" content={props.title} />
      {props.image && <meta property="og:image" content={props.image.url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      {props.description && (
        <meta name="twitter:description" content={props.description} />
      )}
      {props.image && <meta name="twitter:image" content={props.image.url} />}
    </Helmet>
  );
}

import "../assets/styles/globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as React from "react";
import Router from "next/router";
import Head from "next/head";
import ProgressBar from "@badrap/bar-of-progress";
import { Toaster } from "react-hot-toast";

import Title from "@/components/atoms/Title";
import socialCardLarge from "@/public/images/social-card-large.png";

// Loading Progress using @badrap/bar-of-progress
const progress = new ProgressBar({
  size: 2,
  color: "#64891E",
  className: "bar-of-progress",
  delay: 100,
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== "undefined") {
  progress.start();
  progress.finish();
}
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", () => {
  progress.finish();
  window.scrollTo(0, 0);
});
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps, router }) => {
  const Layout = Component.layoutProps?.Layout || React.Fragment;
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps }
    : {};
  const meta = Component.layoutProps?.meta || {};
  const description =
    meta.metaDescription || meta.description || "Embrace New Ways to Farm.";

  return (
    <>
      <Title suffix="Clover">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@clover" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`http://localhost:3000${socialCardLarge}`}
        />
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content="@FahmiIdrisA"
        />
        <meta
          key="og:url"
          property="og:url"
          content={`http://localhost:3000${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta
          key="og:image"
          property="og:image"
          content={`http://localhost:3000${socialCardLarge}`}
        />
      </Head>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </>
  );
};

export default MyApp;

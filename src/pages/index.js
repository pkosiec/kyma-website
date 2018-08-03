import React from "react";
import i18n from "../config/i18n";
import Helmet from "react-helmet";
import Headline from "../components/landing/Headline";
import Features from "../components/landing/Features";
import WhatIs from "../components/landing/WhatIs";
import LandingLayout from "../components/layout/LandingLayout";
import Mission from "../components/landing/Mission";

const IndexPage = () => {
  const title = i18n.t("metadata.title");

  return (
    <LandingLayout>
      <Helmet title={title}>
        <meta name="og:site_name" content={title} />
      </Helmet>
      <div className="container">
        <Headline />
        <Mission />
      </div>
      <WhatIs />
      <div className="container">
        <Features />
      </div>
    </LandingLayout>
  );
};

export default IndexPage;

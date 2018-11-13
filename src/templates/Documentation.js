import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Docs from "../components/docs/Docs.component";
import DefaultLayout from "../components/layout/DefaultLayout";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const Documentation = props => {
  console.log(props);
  //   const { latestVersion, versions, pageName, ...otherProps } = props;

  return (
    <DefaultLayout pageId="documentation">
      <Helmet />
      <Wrapper>
        {JSON.stringify(props)}
        {/* <Docs
          latestVersion={latestVersion}
          versions={versions}
          pageName={pageName}
          {...otherProps}
        /> */}
      </Wrapper>
    </DefaultLayout>
  );
};

export default Documentation;

import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import DocsRoot from "../components/docs/DocsRoot.component";
import DefaultLayout from "../components/layout/DefaultLayout";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const Documentation = ({ pathContext = {}, ...otherProps }) => {
  const { displayName } = pathContext;

  console.log(otherProps);

  return (
    <DefaultLayout pageName={displayName}>
      <Helmet />
      <Wrapper>
        <DocsRoot {...pathContext} />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Documentation;

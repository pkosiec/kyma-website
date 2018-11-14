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

const Documentation = ({
  pageContext = {},
  location,
  match,
  ...otherProps
}) => {
  const { displayName } = pageContext;

  console.log(otherProps);

  return (
    <DefaultLayout pageName={displayName}>
      <Helmet />
      <Wrapper>
        <Docs {...pageContext} location={location} match={match} />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Documentation;

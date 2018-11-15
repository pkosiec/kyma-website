import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";

const Wrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 94px);

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    max-height: calc(100vh - 140px);
  }
`;

const Separator = styled.div`
  box-sizing: border-box;
  display: block;
  height: ${props => (props.height ? props.height : "1px")};
  opacity: 0.1;
  background-color: #000000;
  margin: ${props => (props.margin ? props.margin : "0")};
`;

const NavigationContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  text-align: left;
`;

const NavigationHeader = styled.div`
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: rgba(63, 80, 96, 0.6);
  padding: 10px 0;
  text-transform: uppercase;
`;

const Items = styled.ul`
  width: auto;
  margin: 0;
  margin-top: ${props => (props.marginTop ? "10px" : "0")};
  margin-bottom: ${props => (props.marginTop ? "-10px" : "0")};
  margin-left: ${props => (props.secondary ? "10px" : "0")};
  padding: 0;
  max-height: ${props =>
    (props.show && "9000px") || (props.showAll && "auto") || "0"};
  overflow-y: ${props => (props.show ? "auto" : "hidden")};
  transition: max-height ease-in-out 0.7s;
`;

const ACTIVE_COLOR = "#167ee6";
const Item = styled.li`
  display: block;
  padding: 10px 0;
`;

const LinkWrapper = styled.div`
  position: relative;
`;
const Arrow = styled.a`
  width: 16px;
  height: 100%;
  display: block;
  position: absolute;
  z-index: 50;
  cursor: pointer;
  :before {
    content: "";
    display: "block";
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: ${props =>
      props.active
        ? `3px solid ${ACTIVE_COLOR}`
        : "3px solid rgba(50,54,58,0.6)"};
    left: 2px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    transform: ${props =>
      props.activeArrow
        ? "translateY(-50%) rotate(90deg)"
        : "translateY(-50%)"};
  }
`;
const StyledLink = styled(Link)`
  color: ${props => (props.active ? ACTIVE_COLOR : "#485766")};
  font-size: 14px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  display: block;
  padding-left: 16px;
  position: relative;
  text-decoration: none;
  :hover {
    color: ${ACTIVE_COLOR};
    cursor: pointer;
  }
`;

function SecondarySubLink(props) {
  const {
    rootId,
    parentId,
    type,
    items,
    active,
    activeNav,
    getPathLink,
  } = props;

  let setActiveNav = clickedItem => {
    props.setActiveNav(clickedItem);
  };
  const isActiveNav = parentId
    ? activeNav.id === rootId &&
      activeNav.hash &&
      activeNav.hash.indexOf(parentId) !== -1
    : activeNav.id === rootId;

  return (
    <Items secondary marginTop show={isActiveNav}>
      {items &&
        items.map((item, index) => {
          let hash, isActive, topicType;
          if (parentId) {
            hash = `${parentId}-${item.anchor}`;
            isActive =
              active &&
              active.hash &&
              active.id === rootId &&
              active.hash === `${parentId}-${item.anchor}`;
          } else {
            topicType = item.topicType
              ? item.topicType.replace(/ /g, "-").toLowerCase()
              : item.anchor;
            hash = `${topicType}-${item.anchor}`;
            isActive =
              active &&
              active.hash &&
              active.id === rootId &&
              active.hash === hash;
          }

          const hasSubElements = item && item.titles && item.titles.length > 0;
          const isActiveNavArrow =
            hasSubElements &&
            activeNav.id === rootId &&
            activeNav.hash &&
            activeNav.hash.indexOf(item.anchor) !== -1;
          return (
            <Item
              key={
                parentId
                  ? `${rootId}-${parentId}-${item.anchor}`
                  : `${rootId}-${item.anchor}`
              }
            >
              <LinkWrapper>
                {hasSubElements && (
                  <Arrow
                    onClick={() => {
                      setActiveNav({
                        id: rootId,
                        type: type,
                        hash: hash,
                      });
                    }}
                    active={isActive}
                    activeArrow={isActiveNavArrow}
                  />
                )}
                <StyledLink
                  active={isActive}
                  to={getPathLink({
                    id: rootId,
                    type: type,
                    hash: hash,
                  })}
                >
                  {item.name}
                </StyledLink>
              </LinkWrapper>
              {hasSubElements && (
                <SecondarySubLink
                  items={item.titles}
                  type={type}
                  getPathLink={getPathLink}
                  rootId={rootId}
                  parentId={item.anchor}
                  active={active}
                  activeNav={activeNav}
                />
              )}
            </Item>
          );
        })}
    </Items>
  );
}

function NavigationList(props) {
  const getPathLink = (version => {
    return ({ id, type, hash }) => {
      return `/docs/${version}/${type}/${id}${hash ? `#${hash}` : ""}`;
    };
  })(props.currentVersion);

  let setActiveNav = clickedItem => {
    props.setActiveNav(clickedItem);
  };

  return (
    <Wrapper>
      <NavigationContainer>
        <Items showAll>
          <Item key={props.items.root.id}>
            <LinkWrapper>
              {props.topics && (
                <Arrow
                  onClick={() => {
                    setActiveNav({
                      id: props.items.root.id,
                      type: "root",
                      hash: "",
                    });
                  }}
                  activeArrow={props.items.root.id === props.activeNav.id}
                  // active={
                  //   !props.active.hash &&
                  //   props.active.id === props.items.root.id
                  // }
                />
              )}
              <StyledLink
                // active={
                //   !props.active.hash && props.active.id === props.items.root.id
                // }
                to={getPathLink({
                  id: props.items.root.id,
                  type: "root",
                  hash: "",
                })}
              >
                {props.items.root.displayName}
              </StyledLink>
            </LinkWrapper>
            {props.topics && (
              <SecondarySubLink
                items={
                  props.topics.find(obj => obj.id === props.items.root.id)
                    .sections
                }
                type="root"
                rootId={props.items.root.id}
                active={props.active}
                activeNav={props.activeNav}
                setActiveNav={props.setActiveNav}
                getPathLink={getPathLink}
              />
            )}
          </Item>
        </Items>
      </NavigationContainer>
      <Separator />
      <NavigationContainer>
        <NavigationHeader>Components</NavigationHeader>
        <Items showAll>
          {props.items.components.map(item => {
            let topics = null;
            if (props.topics) {
              topics = props.topics.find(obj => obj.id === item.id);
            }
            return (
              <Item key={item.id}>
                <LinkWrapper>
                  {topics &&
                    topics.sections && (
                      <Arrow
                        onClick={() => {
                          setActiveNav({
                            id: item.id,
                            type: "components",
                            hash: "",
                          });
                        }}
                        activeArrow={item.id === props.activeNav.id}
                        // active={
                        //   !props.active.hash && props.active.id === item.id
                        // }
                      />
                    )}
                  <StyledLink
                    // active={!props.active.hash && props.active.id === item.id}
                    to={getPathLink({
                      id: item.id,
                      type: "components",
                      hash: "",
                    })}
                  >
                    {item.displayName}
                  </StyledLink>
                </LinkWrapper>
                {topics &&
                  topics.sections && (
                    <SecondarySubLink
                      items={topics.sections}
                      type="components"
                      rootId={item.id}
                      // active={props.active}
                      activeNav={props.activeNav}
                      getPathLink={getPathLink}
                      setActiveNav={props.setActiveNav}
                    />
                  )}
              </Item>
            );
          })}
        </Items>
      </NavigationContainer>
    </Wrapper>
  );
}

export default NavigationList;

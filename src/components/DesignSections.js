import React from "react";
import { NAV_HEIGHT, SIDE_PADDING } from "style/Constants";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";
import Img from "gatsby-image/withIEPolyfill";
import { BLOCKS } from "@contentful/rich-text-types";

import tw from "tailwind.macro";

const SectionsContainer = styled.div`
  ${tw`flex-1`}
`;

const SectionText = styled.div`
  ${tw`pl-side pr-side md:px-0`}
`;

const PostImg = styled.img`
  ${tw`object-contain w-full h-auto`}
`;

const Heading = styled.p`
  ${tw`text-lg mt-side mb-side md:w-3/5`}
`;

const Paragraph = styled.p`
  ${tw`mt-side mb-side md:w-3/5`}
`;

const SectionImg = styled(Img)`
  ${tw`w-full h-auto text-transparent`}
  & > div {
    padding-bottom: 100%;
  }
`;

const Section = styled.div`
  ${tw`mb-side`}
  &:before {
    content: "";
    display: block;
    height: ${NAV_HEIGHT + SIDE_PADDING}rem;
    margin: -${NAV_HEIGHT + SIDE_PADDING}rem 0 0;
  }
`;

const hasContent = children => {
  return (
    children.length === 1 &&
    typeof children[0] === "string" &&
    children[0].length > 0
  );
};

const sectionRendererOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { title, file } = node.data.target.fields;
      const { url } = file["en-US"];
      return <PostImg src={url} />;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return hasContent(children) ? <Paragraph>{children}</Paragraph> : null;
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return <Heading>{children}</Heading>;
    }
  }
};

const DesignSections = props => {
  return (
    <SectionsContainer>
      {props.sections.map(section => (
        <Section key={section.id} id={section.slug}>
          <SectionText>
            {documentToReactComponents(
              section.content.json,
              sectionRendererOptions
            )}
          </SectionText>
          {section.images &&
            section.images.map((image, i) => {
              const hasMobile = image.mobileImage;
              const sources = [];
              if (hasMobile) {
                sources.push({
                  ...image.desktopImage.localFile.childImageSharp.fluid,
                  media: `(min-width: ${breakpoints.medium})`
                });
                sources.push({
                  ...image.mobileImage.localFile.childImageSharp.fluid,
                  media: `(min-width: 1px)`
                });
              } else {
                sources.push(
                  image.desktopImage.localFile.childImageSharp.fluid
                );
              }
              return (
                <SectionImg
                  alt={`${section.name} part ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fadeIn={false}
                  key={image.id}
                  fluid={sources}
                />
              );
            })}
        </Section>
      ))}
    </SectionsContainer>
  );
};

export default DesignSections;

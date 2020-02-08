import React from "react";
import { NAV_HEIGHT, SIDE_PADDING } from "style/Constants";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { BLOCKS } from "@contentful/rich-text-types";

import tw from "tailwind.macro";

const SectionsContainer = styled.div`
  ${tw`flex-1`}
`;

const PostImg = styled.img`
  ${tw`object-contain w-full h-auto`}
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

const sectionRendererOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const { title, file } = node.data.target.fields;
      const { url } = file["en-US"];
      return <PostImg src={url} />;
    }
  }
};

const DesignSections = props => {
  return (
    <SectionsContainer>
      {props.sections.map(section => (
        <Section key={section.id} id={section.slug}>
          {documentToReactComponents(
            section.content.json,
            sectionRendererOptions
          )}
        </Section>
      ))}
    </SectionsContainer>
  );
};

export default DesignSections;

import React from "react";
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
        <div key={section.id} id={section.slug}>
          {documentToReactComponents(
            section.content.json,
            sectionRendererOptions
          )}
        </div>
      ))}
    </SectionsContainer>
  );
};

export default DesignSections;

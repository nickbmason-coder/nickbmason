import React from "react";
import { NAV_HEIGHT, SIDE_PADDING } from "style/Constants";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";
import Img from "gatsby-image/withIEPolyfill";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ReactPlayer from "react-player";

import tw from "tailwind.macro";
import DesignSectionEndNav from "./DesignSectionEndNav";
import ResponsiveAssetLink from "./ResponsiveAssetLink";

const SectionsContainer = styled.div`
  ${tw`flex-1 md:pr-side`}
`;

const SectionButton = styled.a`
  ${tw`block py-2 mb-3 text-center text-white bg-black border hover:bg-gray-700`}
  transition: background-color .4s;
  transform: translateY(4px);
  width: 7rem;
`;

const PostImg = styled.img`
  ${tw`object-contain w-full h-auto`}
`;

const Heading = styled.p`
  ${tw`text-lg mt-side mb-side md:w-3/5 pl-side pr-side md:px-0`}
`;

const Paragraph = styled.p`
  ${tw`mt-side mb-side md:w-3/5 pl-side pr-side md:px-0`}
`;

const Anchor = styled.a`
  ${tw`underline`}
  color: blue;
  &:visited {
    color: purple;
  }
`;

const ResponsiveAssetAnchor = styled(ResponsiveAssetLink)`
  ${tw`underline`}
  color: blue;
  &:visited {
    color: purple;
  }
`;

const SectionImg = styled(Img)`
  ${tw`w-full h-auto text-transparent`}
  & > div {
    padding-bottom: 100%;
  }
`;

// &:first-of-type:before {
const Section = styled.div`
  ${tw`mb-side`}
  &:before {
    content: "";
    display: block;
    height: ${NAV_HEIGHT}rem;
    margin: -${NAV_HEIGHT}rem 0 0;
  }
`;

const hasContent = children => {
  return (
    children.length > 0 &&
    typeof children[0] === "string" &&
    children[0].length > 0
  );
};

const addSectionResponsiveStreamable = (asset, index, mime) => {
  let streamUrl = asset.desktopAsset.localFile.localURL;
  const hasMobile = asset.mobileAsset;
  if (
    hasMobile &&
    typeof window !== `undefined` &&
    window.matchMedia(`(max-width: ${breakpoints.medium})`).matches
  ) {
    streamUrl = asset.mobileAsset.localFile.localURL;
  }
  return (
    <ReactPlayer
      height="auto"
      width="100%"
      url={streamUrl}
      muted={isVideo(mime)}
      playing={isVideo(mime)}
      key={asset.id}
      playsinline
      loop={isVideo(mime)}
      controls
    />
  );
};

const addSectionResponsiveImage = (asset, index) => {
  const sources = [];
  const hasMobile = asset.mobileAsset;
  if (hasMobile) {
    sources.push({
      ...asset.desktopAsset.localFile.childImageSharp.fluid,
      media: `(min-width: ${breakpoints.medium})`
    });
    sources.push({
      ...asset.mobileAsset.localFile.childImageSharp.fluid,
      media: `(min-width: 1px)`
    });
  } else {
    sources.push(asset.desktopAsset.localFile.childImageSharp.fluid);
  }
  return (
    <SectionImg
      alt={`Section part ${index + 1}`}
      loading={index === 0 ? "eager" : "lazy"}
      fadeIn={false}
      key={asset.id}
      fluid={sources}
    />
  );
};

const isVideo = mime => {
  const validMimes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
  return validMimes.includes(mime);
};

const isAudio = mime => {
  const validMimes = ["audio/mpeg", "audio/mp4"];
  return validMimes.includes(mime);
};

const isVideoOrAudio = mime => {
  return isVideo(mime) || isAudio(mime);
};

const sectionRendererOptions = cidToAsset => {
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { file } = node.data.target.fields;
        const { url, contentType } = file["en-US"];
        return isVideoOrAudio(contentType) ? (
          <ReactPlayer
            height="auto"
            width="100%"
            url={url}
            muted={isVideo(contentType)}
            playing={isVideo(contentType)}
            loop={isVideo(contentType)}
            playsinline
            controls
          />
        ) : (
          <PostImg src={url} />
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Heading>{children}</Heading>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return hasContent(children) ? <Paragraph>{children}</Paragraph> : null;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return hasContent(children) ? (
          <Anchor href={node.data.uri} target="_blank">
            {children}
          </Anchor>
        ) : null;
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        if (!hasContent(children)) {
          return null;
        }
        const cid = node.data.target.sys.contentful_id;
        return cidToAsset[cid] ? (
          <ResponsiveAssetAnchor asset={cidToAsset[cid]} target="_blank">
            {children}
          </ResponsiveAssetAnchor>
        ) : (
          <Paragraph>{children}</Paragraph>
        );
      }
    }
  };
};

const DesignSections = props => {
  return (
    <SectionsContainer>
      {props.sections.map(section => (
        <Section key={section.id} id={section.slug}>
          <div>
            {documentToReactComponents(
              section.content.json,
              sectionRendererOptions(props.responsiveAssetsByCid)
            )}
          </div>
          {section.assets &&
            section.assets.map((asset, index) => {
              const mime = asset.desktopAsset.localFile.internal.mediaType;
              if (isVideoOrAudio(mime)) {
                return addSectionResponsiveStreamable(asset, index, mime);
              }
              if (mime === "application/pdf") {
                return (
                  <SectionButton href={asset.desktopAsset.localFile.localURL}>
                    {asset.desktopAsset.localFile.name}
                  </SectionButton>
                );
              }
              return addSectionResponsiveImage(asset, index);
            })}
        </Section>
      ))}
      <DesignSectionEndNav nextPath={props.nextPath} />
    </SectionsContainer>
  );
};

export default DesignSections;

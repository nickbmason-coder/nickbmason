import * as PropTypes from "prop-types";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import { NAV_HEIGHT_REM } from "style/Constants";

const ContactPage = styled.div`
  ${tw`w-full p-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const ContactContainer = styled.div`
  ${tw`flex flex-col justify-between w-full h-full md:w-4/6`}
`;

const PostImg = styled.img`
  ${tw`object-contain w-full h-auto`}
`;

const MaurerLink = styled.div`
  ${tw`w-full pt-2 border-t-2 border-black`}
`;

const sectionRendererOptions = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: node => {
      const { title, file } = node.data.target.fields;
      const { url } = file["en-US"];
      return <a href={url}>{documentToReactComponents(node.content[0])}</a>;
    }
  }
};

class Contact extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        contactAboutMe: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { siteMetadata } = this.props.data;

    return (
      <ContactPage>
        <ContactContainer>
          <div>
            {documentToReactComponents(
              siteMetadata.contactAboutMe.json,
              sectionRendererOptions
            )}
          </div>
          <div>
            <p>Say hey!</p>
            <p>Nick Mason </p>
            <p>
              <b>
                <a href="https://www.instagram.com/nickbmason/">@nickbmason</a>
              </b>
            </p>
            <p>
              <b>
                <a href="mailto:nickmason721@gmail.com">
                  nickmason721@gmail.com
                </a>
              </b>
            </p>
          </div>
          <MaurerLink>Website by Michael Maurer</MaurerLink>
        </ContactContainer>
      </ContactPage>
    );
  }
}

export default Contact;

export const pageQuery = graphql`
  query {
    ...SiteMetadata
  }
`;

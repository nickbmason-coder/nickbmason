import * as PropTypes from "prop-types";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { graphql, Link } from "gatsby";
import tw from "tailwind.macro";
import { Helmet } from "react-helmet";
import { NAV_HEIGHT_REM } from "style/Constants";

const ContactPage = styled.div`
  ${tw`w-full p-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const ContactContainer = styled.div`
  ${tw`flex flex-col justify-between w-full h-full md:w-4/6`}
`;

const ContactSection = styled.div`
  ${tw`text-sm leading-relaxed mb-side`}
`;

const ContactButton = styled.a`
  ${tw`block inline-block w-32 px-4 py-3 mb-4 font-bold text-center border border-black hover:bg-gray-400`}
  transition: .5s;
`;

const MaurerLink = styled.div`
  ${tw`w-full pt-2 text-sm border-t-2 border-black`}
`;

class Contact extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        contactAboutMe: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { resume, portfolio, siteMetadata } = this.props.data;

    return (
      <ContactPage>
        <Helmet>
          <meta name="description" content={siteMetadata.contactDescription} />
          <meta
            property="og:description"
            content={siteMetadata.contactDescription}
          />
          <title>Contact</title>
          <meta property="og:title" content="Contact | Nick Mason" />
          <meta
            property="og:url"
            content="https://www.nickbmason.com/contact"
          />
          <meta property="og:type" content="article" />
        </Helmet>
        <ContactContainer>
          <div>
            <ContactSection>
              {documentToReactComponents(siteMetadata.contactAboutMe.json)}
            </ContactSection>
            <ContactSection>
              <p>
                <b>
                  <a href="https://www.instagram.com/nickbmason/">
                    @nickbmason
                  </a>
                </b>
              </p>
              <p>
                <b>859.638.0795</b>
              </p>
              <p>
                <b>
                  <a href="mailto:nickmason721@gmail.com">
                    nickmason721@gmail.com
                  </a>
                </b>
              </p>
            </ContactSection>
            <ContactSection>
              <ContactButton href={resume.localFile.url}>
                Resume PDF
              </ContactButton>
              <br />
              <ContactButton href={portfolio.localFile.url}>
                Portfolio PDF
              </ContactButton>
            </ContactSection>
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
    ...ResumeFragment
    ...PortfolioFragment
  }
`;

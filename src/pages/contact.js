import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import tw from "twin.macro";
import { Helmet } from "react-helmet";
import { NAV_HEIGHT_REM } from "style/Constants";
import Button from "../components/Button";
import ResponsiveAssetLink from "../components/ResponsiveAssetLink";

const ContactPage = styled.div`
  ${tw`w-full p-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const ContactContainer = styled.div`
  ${tw`flex flex-col justify-between w-full h-full md:w-3/5`}
`;

const ContactSection = styled.div`
  ${tw`text-sm leading-relaxed mb-side`}
`;

const ContactButton = styled(Button)`
  ${tw`mb-3`}
`;

const GitHubButton = styled.div`
  ${tw`text-xs inline-block py-1 w-20 border border-black font-medium text-center`}
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
`;

const Maurer = styled.div`
  ${tw`relative w-auto text-sm`}
`;

const MaurerText = styled.div`
  ${tw`inline-block w-auto pr-2 mr-2 border-r border-black`}
`;

class Contact extends React.Component {
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
          <meta property="og:title" content="Nick Mason | Contact" />
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
                <a href="mailto:hello@nickbmason.com">hello@nickbmason.com</a>
              </p>
              <p>859.638.0795</p>
              <p>
                <a href="https://www.instagram.com/nickbmason/">@nickbmason</a>
              </p>
            </ContactSection>
            <ContactSection>
              <ContactButton>
                <ResponsiveAssetLink asset={resume}>
                  Resume PDF
                </ResponsiveAssetLink>
              </ContactButton>
              <ContactButton>
                <ResponsiveAssetLink asset={portfolio}>
                  Portfolio PDF
                </ResponsiveAssetLink>
              </ContactButton>
            </ContactSection>
          </div>
          <Maurer>
            <MaurerText>Website by Michael Maurer</MaurerText>
            <a
              href="https://github.com/nickbmason-coder/nickbmason"
              aria-label="View source on GitHub"
            >
              <GitHubButton>View Source</GitHubButton>
            </a>
          </Maurer>
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

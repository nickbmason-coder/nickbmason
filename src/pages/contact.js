import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import { Helmet } from "react-helmet";
import { NAV_HEIGHT_REM } from "style/Constants";
import GitHubButton from "react-github-btn";

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
  ${tw`block py-2 mb-3 text-center text-white bg-black border hover:bg-gray-700`}
  transition: background-color .4s;
  transform: translateY(4px);
  width: 7rem;
`;

const Maurer = styled.div`
  ${tw`relative w-auto text-sm`}
  & > span {
    position: relative;
    top: 6px;
  }
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
                <a href="mailto:nickmason721@gmail.com">
                  nickmason721@gmail.com
                </a>
              </p>
              <p>859.638.0795</p>
              <p>
                <a href="https://www.instagram.com/nickbmason/">@nickbmason</a>
              </p>
            </ContactSection>
            <ContactSection>
              <ContactButton href={resume.localFile.url}>
                Resume PDF
              </ContactButton>
              <ContactButton href={portfolio.localFile.url}>
                Portfolio PDF
              </ContactButton>
            </ContactSection>
          </div>
          <Maurer>
            <MaurerText>Website by Michael Maurer</MaurerText>
            <GitHubButton
              href="https://github.com/nickbmason-coder/nickbmason"
              aria-label="View source on GitHub"
            >
              View Source
            </GitHubButton>
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

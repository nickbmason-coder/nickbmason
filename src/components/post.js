import * as PropTypes from "prop-types";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import postStyles from "./post.module.css";
import { rhythm, scale } from "../utils/typography";
import presets from "../utils/presets";

let touched = false;

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      smallImage: PropTypes.object,
      likes: PropTypes.number,
      id: PropTypes.string.isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      hovering: false
    };
  }

  render() {
    const { smallImage, likes, id } = this.props.post;
    const { small } = smallImage.childImageSharp;
    return (
      <Link
        data-testid="post"
        to={`/${id}/`}
        onTouchStart={() => (touched = true)}
        onMouseEnter={() => {
          if (!touched) {
            this.setState({ hovering: true });
          }
        }}
        onMouseLeave={() => {
          if (!touched) {
            this.setState({ hovering: false });
          }
        }}
        className={postStyles.post}
      >
        <div className={postStyles.imageContainer}>
          <Img fluid={{ ...small }} className={postStyles.image} />
          <div className={postStyles.bottomImage} />
        </div>
        {/* overlay */}
        {this.state.hovering && (
          <div data-testid="likes" className={postStyles.imageOverlay}>
            {likes}
          </div>
        )}
      </Link>
    );
  }
}

export default Post;

export const postFragment = graphql`
  fragment Post_details on PostsJson {
    id
    likes
    smallImage: image {
      childImageSharp {
        small: fluid(maxWidth: 292, maxHeight: 292) {
          src
          srcSet
          aspectRatio
          sizes
          tracedSVG
        }
      }
    }
  }
`;

import { keyframes } from "@emotion/core";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const slideDown = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-120%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`;

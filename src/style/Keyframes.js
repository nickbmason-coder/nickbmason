import { keyframes } from "@emotion/core";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const slideIn = movement => keyframes`
  from {
    opacity: 0;
    transform: translateX(${movement}%);
  }
  60% {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`;

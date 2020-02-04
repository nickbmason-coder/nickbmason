const Breakpoints = require("./src/style/Breakpoints");
const Constants = require("./src/style/Constants");

module.exports = {
  theme: {
    screens: {
      'sm': Breakpoints.small,
      'md': Breakpoints.medium,
      'lg': Breakpoints.large
    },
    extend: {
      colors: {
        salmon: "#fff1e9"
      },
      spacing: {
        side: "1.5rem",
        "side-1/2": ".75rem"
      },
      width: {
        large: "33.3%",
        medium: "50%"
      },
      height: {
        artpost: Constants.FRAME_HEIGHT_PX
      },
      inset: {
        "1/2": "50%"
      }
    }
  },
  variants: {},
  plugins: []
};

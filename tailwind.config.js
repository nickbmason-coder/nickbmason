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
        side: "1.5rem"
      },
      width: {
        large: "32.5%",
        medium: "49.5%"
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

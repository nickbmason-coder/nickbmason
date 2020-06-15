const Breakpoints = require("./src/style/Breakpoints");
const Constants = require("./src/style/Constants");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    screens: {
      'sm': Breakpoints.small,
      'md': Breakpoints.medium,
      'lg': Breakpoints.large
    },
    extend: {
      fontSize: {
        'xxs': "0.625rem"
      },
      colors: {
        salmon: "#fff1e9"
      },
      spacing: {
        side: Constants.SIDE_PADDING_REM,
        "side-1/2": `${Constants.SIDE_PADDING / 2}rem`
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

import Typography from "typography";

const options = {
  googleFonts: [
    {
      name: `Roboto`,
      styles: [`400`, `400i`, `700`, `700i`]
    }
  ],
  baseFontSize: `18px`,
  baseLineHeight: 1.4,
  scaleRatio: 1.5,
  headerColor: `hsla(0,0%,0%,0.8)`,
  bodyColor: `hsla(0,0%,0%,0.7)`,
  blockMarginBottom: 0.75,
  headerFontFamily: [`Roboto`],
  bodyFontFamily: [`Roboto`],
  overrideStyles: () => {
    return {
      html: {
        overflowY: `scroll`
      },
      h1: {
        lineHeight: 1.1
      },
      a: {
        color: `#3897f0`
      }
    };
  }
};

const typography = new Typography(options);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const { scale } = typography;
export const { rhythm } = typography;

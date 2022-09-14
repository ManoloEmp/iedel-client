// src/@chakra-ui/gatsby-plugin/theme.js
// src/@chakra-ui/gatsby-plugin/theme.js
import { extendTheme } from "@chakra-ui/react";
const theme = {
  colors: {
    brand: {
      "green-core": "#007D03",
      "blue-cta": "#7F00FF",
      "blue-light": "#EAE5FF",
      "orange-light": "#ff9955",
      "verde-oliva": "#646f22",
      "verde-pastel": "#C6EC89",
      "verde-medium": "#009C02",
      "verde-light": "#ecfbd5",
      "verde-gris": "#ecf8f4",
    },
    primary: "rebeccapurple",
  },
  fonts: {
    cta: { "cursiva": "Lofty Goals" },
    body: "Montserrat, system-ui, sans-serif",
    heading: "Manrope, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
};

export default extendTheme(theme);

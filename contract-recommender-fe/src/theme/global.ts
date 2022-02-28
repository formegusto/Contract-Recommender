import { mode } from "@chakra-ui/theme-tools";

const GlobalTheme = {
  fonts: {
    body: "'Spoqa Han Sans Neo', 'sans-serif'",
    heading: "'Spoqa Han Sans Neo', 'sans-serif'",
    mono: "'Spoqa Han Sans Neo', 'sans-serif'",
  },
  styles: {
    global: (props: any) => ({
      body: {
        background: mode("bg.light", "bg.dark")(props),
      },
      "*": {
        msOverflowStyle: "none",
      },
      "*::-webkit-scrollbar": {
        display: "none",
      },
      ".chakra-alert": {
        background: mode("#fff !important", "#121215 !important")(props),
        color: mode("#202020 !important", "#fff !important")(props),
      },
    }),
  },
};

export default GlobalTheme;

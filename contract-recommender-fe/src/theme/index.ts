import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import ColorTheme from "./colors";
import FontTheme from "./fonts";
import GlobalTheme from "./global";
import TokenTheme from "./tokens";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    config,
  },
  GlobalTheme,
  ColorTheme,
  FontTheme,
  TokenTheme
);

export default theme;

import { Box, Image, useColorMode } from "@chakra-ui/react";
import Assets from "../../assets";

function ResLogo() {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === "light" ? Assets.Logo.color : Assets.Logo.white}
      width="160px"
    />
  );
}

function FooterComponent() {
  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight="80px"
      justifyContent="flex-end"
      sx={{
        padding: "0 40px 0",
        boxSizing: "border-box",
      }}
    >
      <ResLogo />
    </Box>
  );
}

export default FooterComponent;

import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AlertDrawer from "../components/alert/AlertDrawer";
import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";
import RegistDrawer from "../components/regist/RegistDrawer";

function RootPage() {
  return (
    <Box display="flex" flexDirection="column" width="1060px" height="760px">
      <AlertDrawer />
      <RegistDrawer />
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </Box>
  );
}

export default RootPage;

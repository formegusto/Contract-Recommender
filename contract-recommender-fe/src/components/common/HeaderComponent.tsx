import {
  Box,
  IconButton,
  Text,
  useColorMode,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { ChevronLeftIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import AlertButton from "../alert/AlertButton";
import { useLocation, useNavigate } from "react-router-dom";
import { moveRightToLeft } from "../../animations/move";
import UIConnector from "../../store/ui/connector";
import { ConnectedProps } from "react-redux";

type Props = ConnectedProps<typeof UIConnector>;

function _Icons({ showDrawer }: Props) {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Box
      display="flex"
      sx={{
        "*:not(:last-child)": {
          margin: "0 4px 0 0",
        },
      }}
    >
      <AlertButton
        aria-label="alert"
        onClick={() =>
          showDrawer({
            type: "alert",
          })
        }
      />
      {colorMode === "light" ? (
        <IconButton
          color="modetext"
          fontSize="h3"
          aria-label="change-mode-dark"
          bgColor="transparent"
          onClick={() => setColorMode("dark")}
          icon={<MoonIcon />}
        />
      ) : (
        <IconButton
          color="modetext"
          fontSize="h3"
          aria-label="change-mode-white"
          bgColor="transparent"
          onClick={() => setColorMode("light")}
          icon={<SunIcon />}
        />
      )}
    </Box>
  );
}
const Icons = UIConnector(_Icons);

function HeaderComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  const backBtnAni = prefersReducedMotion
    ? undefined
    : `${moveRightToLeft} .3s linear forwards`;

  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight="100px"
      justifyContent="space-between"
      sx={{
        padding: "0 40px 0",
        boxSizing: "border-box",
      }}
      {...(pathname !== "/" && {
        bgColor: "modebox",
      })}
    >
      {pathname === "/" ? (
        <Text fontSize="h4" fontWeight="bold" color="modern.200">
          Contract Recomment System
        </Text>
      ) : (
        <IconButton
          color="modern.200"
          fontSize="h2"
          aria-label="back-btn"
          bgColor="transparent"
          onClick={() => navigate("/")}
          animation={backBtnAni}
          icon={<ChevronLeftIcon />}
        />
      )}
      <Icons />
    </Box>
  );
}

export default HeaderComponent;

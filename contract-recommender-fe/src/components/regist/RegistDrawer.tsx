import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import UIConnector from "../../store/ui/connector";
import RegistForm from "./RegistForm";

type Props = ConnectedProps<typeof UIConnector>;
function RegistDrawer({ drawer, hideDrawer }: Props) {
  const initialFocus = React.useRef<any>();
  return (
    <Drawer
      placement="right"
      isOpen={
        drawer !== undefined && drawer !== null && drawer.type === "regist"
      }
      initialFocusRef={initialFocus}
      onClose={hideDrawer}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent bg="modebox">
        <Box padding="8px">
          <IconButton
            fontSize="h6"
            color="modetext"
            bg="transparent"
            aria-label="close-alert"
            onClick={hideDrawer}
            icon={<CloseIcon />}
          />
        </Box>
        <Text textStyle="h4" padding="8px 20px 16px">
          시뮬레이션 등록
        </Text>
        <RegistForm initialFocus={initialFocus} hideDrawer={hideDrawer} />
      </DrawerContent>
    </Drawer>
  );
}

export default UIConnector(RegistDrawer);

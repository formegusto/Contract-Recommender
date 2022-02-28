import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ConnectedProps } from "react-redux";
import UIConnector from "../../store/ui/connector";
import AlertTable from "./AlertTable";

type Props = ConnectedProps<typeof UIConnector>;
function AlertDrawer({ drawer, hideDrawer }: Props) {
  return (
    <Drawer
      placement="right"
      isOpen={
        drawer !== undefined && drawer !== null && drawer.type === "alert"
      }
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
          알림
        </Text>
        <AlertTable />
      </DrawerContent>
    </Drawer>
  );
}

export default UIConnector(AlertDrawer);

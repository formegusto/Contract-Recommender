import { AddIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ConnectedProps } from "react-redux";
import UIConnector from "../store/ui/connector";
import ProcessConnector from "../store/process/connector";
import Report from "./report/Report";

type BtnProps = ConnectedProps<typeof UIConnector>;
function _RegistBtn({ showDrawer }: BtnProps) {
  return (
    <IconButton
      color="modetext"
      bgColor="transparent"
      aria-label="new-report"
      onClick={() =>
        showDrawer({
          type: "regist",
        })
      }
      icon={<AddIcon />}
    />
  );
}
const RegistBtn = UIConnector(_RegistBtn);

function MainComponent() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgColor="modebox"
      margin="0 40px 0"
      padding="0 28px 0"
      borderRadius="16px"
      height="576px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="60px"
      >
        <Text fontSize="h5" fontWeight="bold" color="modetext">
          최근 보고서
        </Text>
        <RegistBtn />
      </Box>
      <Report />
    </Box>
  );
}

export default ProcessConnector(MainComponent);

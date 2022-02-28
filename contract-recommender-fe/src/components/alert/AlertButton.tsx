import { BellIcon } from "@chakra-ui/icons";
import { Box, IconButton, IconButtonProps } from "@chakra-ui/react";
import { ConnectedProps } from "react-redux";
import UIConnector from "../../store/ui/connector";

type Props = ConnectedProps<typeof UIConnector> & IconButtonProps;

function AlertButton(props: Props) {
  return (
    <Box width="40px" height="40px" position="relative">
      <IconButton
        position="absolute"
        color="modern.200"
        fontSize="h3"
        bgColor="transparent"
        icon={<BellIcon />}
        {...props}
      />
      {props.bell && (
        <Box
          position="absolute"
          top="6px"
          right="8px"
          width="6px"
          height="6px"
          borderRadius="100%"
          bgColor="graph.red"
        />
      )}
    </Box>
  );
}

export default UIConnector(AlertButton);

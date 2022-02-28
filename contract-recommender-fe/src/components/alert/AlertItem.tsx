import { Flex, Box, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import UIConnector from "../../store/ui/connector";
import React from "react";
import { Alert } from "../../store/ui/types";
import { ConnectedProps } from "react-redux";

type Props = ConnectedProps<typeof UIConnector> & Alert;

function AlertItem({ hideDrawer, message, step, id }: Props) {
  const isLink: boolean =
    step === "mean-analysis" || step === "similarity-analysis";
  const navigate = useNavigate();

  const moveReport = React.useCallback(() => {
    hideDrawer();
    navigate("/report", {
      state: {
        id: id,
      },
    });
  }, [navigate, hideDrawer, id]);

  return (
    <Flex flexDirection="column" paddingBottom={isLink ? "20px" : "28px"}>
      <Flex
        direction="row"
        padding="0 20px 0"
        align="center"
        marginBottom="6px"
      >
        <CheckCircleIcon textStyle="h5" />
        <Text textStyle="p2" color="modern.200" marginLeft="8px" flex="1">
          작업 완료
        </Text>
        <Text textStyle="p2" fontWeight="regular" color="modern.200">
          2022.02.04 13:00
        </Text>
      </Flex>
      <Box padding="0 20px 0 26px" textStyle="p2">
        {message}
      </Box>
      {isLink && (
        <Flex
          direction="row"
          justify="flex-end"
          align="flex-end"
          padding="0 20px 0"
        >
          <Text
            color="modern.200"
            textStyle="p2"
            fontWeight="regular"
            textDecoration="underline"
            cursor="pointer"
            as="a"
            onClick={moveReport}
          >
            결과 확인 하기
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default UIConnector(AlertItem);

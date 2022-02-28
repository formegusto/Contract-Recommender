import { Flex, useTheme } from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import { Line, LineChart } from "recharts";
import ConfigConnector from "../store/config/connector";

const data = [
  { comp: 10, single: 0 },
  { comp: 0, single: 10 },
  { comp: 10, single: 0 },
  { comp: 0, single: 10 },
  { comp: 10, single: 0 },
  { comp: 0, single: 10 },
  { comp: 10, single: 0 },
  { comp: 0, single: 10 },
  { comp: 10, single: 0 },
];

type Props = ConnectedProps<typeof ConfigConnector>;

function Splash({ socket }: Props) {
  const [show, setShow] = React.useState<boolean>(true);
  const boxRef = React.useRef<any>();
  const {
    colors: { graph },
  } = useTheme();

  const hideSplash = React.useCallback(() => {
    setShow(false);
  }, []);

  React.useEffect(() => {
    if (socket) {
      if (boxRef) {
        boxRef.current.style.opacity = 0;
        boxRef.current.addEventListener("transitionend", hideSplash);
      }
    }
  }, [socket, hideSplash]);

  return show ? (
    <Flex
      ref={boxRef}
      position="fixed"
      width="100vw"
      height="100vh"
      top={0}
      left={0}
      bgColor="modebox"
      justify="center"
      align="center"
      transition="2s"
    >
      <LineChart data={data} width={400} height={160}>
        <Line
          dataKey="comp"
          stroke={graph.red}
          dot={false}
          type="monotone"
          strokeWidth={3}
        />
        <Line
          dataKey="single"
          stroke={graph.blue}
          dot={false}
          type="monotone"
          strokeWidth={3}
        />
      </LineChart>
    </Flex>
  ) : (
    <></>
  );
}

export default ConfigConnector(Splash);

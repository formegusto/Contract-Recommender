import {
  Box,
  Flex,
  Spinner,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  Text,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Line, LineChart, ReferenceLine, XAxis } from "recharts";
import API from "../../api";
import { stepToName } from "../../store/common/viewData";
import ProcessConnector from "../../store/process/connector";
import { ReportBase } from "../../store/process/types";

type CustomProps = {
  originalReport: ReportBase;
};

interface Props extends ConnectedProps<typeof ProcessConnector>, CustomProps {}

function ReportItem({ confirmAlert, ui: { alert }, originalReport }: Props) {
  const navigate = useNavigate();
  const id = React.useState<string>(originalReport._id);
  const [report, setReport] = React.useState<ReportBase>(originalReport);
  const {
    colors: { graph },
  } = useTheme();

  const changeReport = React.useCallback(async () => {
    try {
      confirmAlert();
      const res = await API["process"].getProcess(id[0]);
      const newReport = res.data.data as any;

      setReport(newReport);
    } catch (err) {
      console.error(err);
    }
  }, [id, confirmAlert]);

  const moveRecoReport = React.useCallback(() => {
    navigate("/report", {
      state: {
        id: id[0],
      },
    });
  }, [id, navigate]);

  React.useEffect(() => {
    if (alert) {
      if (alert.id === id[0]) {
        changeReport();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, id]);

  return (
    <Box
      className="report-item"
      border="1px"
      borderRadius="16px"
      borderColor="modeborder"
      width="292px"
      boxSizing="border-box"
      padding="16px 12px"
      {...(report.step === "similarity-analysis"
        ? {
            cursor: "pointer",
            sx: {
              "& .recharts-wrapper": {
                cursor: "pointer !important",
              },
            },
            onClick: moveRecoReport,
          }
        : {})}
    >
      <Text textStyle="h6" marginBottom="6px">
        {report.title}
      </Text>
      {report.meanAnalysis ? (
        <LineChart
          width={268}
          height={180}
          data={report.meanAnalysis.positiveCount}
        >
          <XAxis dataKey="percentage" hide />
          <ReferenceLine x={report.recoPercentage} stroke={graph.red} />
          <Line
            type="monotone"
            dataKey="comp"
            stroke={graph.red}
            dot={false}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="single"
            stroke={graph.blue}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      ) : (
        <Flex
          width="268px"
          height="180px"
          justify="center"
          align="center"
          direction="column"
        >
          <Spinner
            size="lg"
            speed="1.5s"
            thickness="4px"
            color="modetext"
            mb={8}
          />
          <Text textStyle="p2">
            현재 <b>"{stepToName[report.step]}"</b>단계 진행중입니다.
          </Text>
          <Text textStyle="p2">
            평균분석이 완료되면 결과를 확인할 수 있습니다.
          </Text>
        </Flex>
      )}

      <Box display="flex" marginBottom="8px">
        <Stat>
          <StatLabel color="modern.200">세대 총 사용량</StatLabel>
          <Text textStyle="p2" fontWeight="bold">
            {report.kwh ? report.kwh.toLocaleString("ko-KR") : "? "}kWh
          </Text>
        </Stat>
        <Stat>
          <StatLabel color="modern.200">공동설비사용량</StatLabel>
          <Text textStyle="p2" fontWeight="bold">
            {report.minPer}% ~ {report.maxPer}%
          </Text>
        </Stat>
      </Box>
      <Box display="flex">
        <Stat>
          <StatLabel color="modern.200">종합계약</StatLabel>
          <StatHelpText opacity={1}>
            <StatArrow type="increase" color="graph.red" />
            <Text textStyle="p2" fontWeight="bold" as="span">
              {report.recoPercentage ? report.recoPercentage : "? "}%
            </Text>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel color="modern.200">단일계약</StatLabel>
          <StatHelpText opacity={1}>
            <StatArrow type="decrease" color="graph.blue" />
            <Text textStyle="p2" fontWeight="bold" as="span">
              {report.recoPercentage ? report.recoPercentage : "? "}%
            </Text>
          </StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
}

export default ProcessConnector(ReportItem);

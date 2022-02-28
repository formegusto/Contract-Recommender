import { Box, Flex, Icon, Text, useTheme } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Cell,
  ReferenceDot,
  Label,
} from "recharts";
import { usageNames, usageToName } from "../store/common/viewData";
import { ReportBase } from "../store/process/types";
import { IoAlertCircleSharp } from "react-icons/io5";

type ItemProps = {
  title?: string;
};

function RecoReportItem({
  title,
  children,
}: React.PropsWithChildren<ItemProps>) {
  return (
    <Box bgColor="modebox">
      {title && (
        <Text className="title" textStyle="h3" color="modehead">
          {title}
        </Text>
      )}
      <Flex
        direction="row"
        margin={`${title ? "0" : "36px"} 48px 32px`}
        wrap="wrap"
        sx={{
          "& > *": {
            minWidth: "466px",
            minHeight: "calc(482px / 2)",
            marginBottom: "16px",
          },
          "& > *:nth-of-type(1n)": {
            marginRight: "16px",
          },
          "& .single,.comp": {
            fontWeight: "bold",
          },
          "& .single": {
            color: "graph.blue",
          },
          "& .comp": {
            color: "graph.red",
          },
          "& .recharts-surface": {
            overflow: "visible",
          },
          "& tspan": {
            fill: "modetext",
          },
        }}
      >
        {children}
      </Flex>
    </Box>
  );
}

type Props = ReportBase;

function RecoReportComponent({
  recoPercentage,
  simAnalysis,
  meanAnalysis,
  minPer,
  dpp,
}: Props) {
  const {
    colors: { graph, modern },
  } = useTheme();

  return (
    <Flex
      direction="column"
      sx={{
        "& > :not(:last-child)": {
          margin: "0 0 24px",
        },
        "& > :first-of-type > .title": {
          margin: "0px 48px 24px",
        },
        "& > :not(:first-of-type) > .title": {
          margin: "32px 48px 24px",
        },
      }}
    >
      <RecoReportItem title="평균치 분석 결과">
        <Text textStyle="h2" fontWeight="thin">
          유리 가구 수 측면에서
          <br />
          공동설비사용량 <b>{recoPercentage}%</b>
          <br />
          이하는 <span className="single">단일계약</span>
          <br />
          이상은 <span className="comp">종합계약</span>이 적합해요.
        </Text>
        <Flex alignItems="center" justify="center" direction="column">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={meanAnalysis!.positiveCount}>
              <XAxis dataKey="percentage" hide />
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
              <ReferenceLine
                x={meanAnalysis!.changePer.positiveCount + "%"}
                stroke={graph.red}
              />
              <Line
                name="종합계약"
                type="monotone"
                dataKey="comp"
                stroke={graph.red}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
              <Line
                name="단일계약"
                type="monotone"
                dataKey="single"
                stroke={graph.blue}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
      </RecoReportItem>
      <RecoReportItem>
        <Text textStyle="h2" fontWeight="thin" marginBottom="16px">
          아파트 전체 요금,
          <br />
          공동설비사용요금,
          <br />
          평균 손해율 분석 결과입니다.
        </Text>
        <Flex alignItems="center" justify="center" direction="column">
          <Text textStyle="h5" width="100%">
            아파트 전체 요금
          </Text>
          <ResponsiveContainer width="100%" height={241}>
            <LineChart data={meanAnalysis!.bill}>
              <XAxis dataKey="percentage" hide />
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
              <ReferenceLine
                x={meanAnalysis!.changePer.bill + "%"}
                stroke={graph.red}
              />
              <Line
                name="종합계약"
                type="monotone"
                dataKey="comp"
                stroke={graph.red}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
              <Line
                name="단일계약"
                type="monotone"
                dataKey="single"
                stroke={graph.blue}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <Text textStyle="p2" width="100%">
            공동설비사용량 <b>{meanAnalysis!.changePer.bill}%</b>를 기준으로
            이하는 <span className="single">단일계약</span> 이상은{" "}
            <span className="comp">종합계약</span>이 적합해요.
          </Text>
        </Flex>
        <Flex alignItems="center" justify="center" direction="column">
          <Text textStyle="h5" width="100%">
            평균 손해율
          </Text>
          <ResponsiveContainer width="100%" height={241}>
            <LineChart data={meanAnalysis!.lossRatio}>
              <XAxis dataKey="percentage" hide />
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
              <ReferenceLine
                x={meanAnalysis!.changePer.lossRatio + "%"}
                stroke={graph.red}
              />
              <Line
                name="종합계약"
                type="monotone"
                dataKey="comp"
                stroke={graph.red}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
              <Line
                name="단일계약"
                type="monotone"
                dataKey="single"
                stroke={graph.blue}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <Text textStyle="p2" width="100%">
            공동설비사용량 <b>{meanAnalysis!.changePer.lossRatio}%</b>를
            기준으로 이하는 <span className="single">단일계약</span> 이상은{" "}
            <span className="comp">종합계약</span>이 적합해요.
          </Text>
        </Flex>
        <Flex alignItems="center" justify="center" direction="column">
          <Text textStyle="h5" width="100%">
            공동설비사용요금
          </Text>
          <ResponsiveContainer width="100%" height={241}>
            <LineChart data={meanAnalysis!.publicBill}>
              <XAxis dataKey="percentage" hide />
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
              <ReferenceLine
                x={meanAnalysis!.changePer.publicBill + "%"}
                stroke={graph.red}
              />
              <Line
                name="종합계약"
                type="monotone"
                dataKey="comp"
                stroke={graph.red}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
              <Line
                name="단일계약"
                type="monotone"
                dataKey="single"
                stroke={graph.blue}
                dot={false}
                animationDuration={1500}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <Text textStyle="p2" width="100%">
            공동설비사용량 <b>{meanAnalysis!.changePer.publicBill}%</b>를
            기준으로 이하는 <span className="single">단일계약</span> 이상은{" "}
            <span className="comp">종합계약</span>이 적합해요.
          </Text>
        </Flex>
      </RecoReportItem>
      <RecoReportItem title="가구별 평균 한 달 사용량 분포">
        <Text textStyle="h2" fontWeight="thin">
          <>
            해당 아파트는
            <br />
            <Text className="usage" as="span" color={graph.green[50]}>
              <b>{usageToName[simAnalysis!.analysisData.histWin]}</b>
            </Text>{" "}
            가구 쪽에
            <br />
            분포를 많이 보여줍니다.
          </>
        </Text>
        <Flex alignItems="center" justify="center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={meanAnalysis!.histogram} barCategoryGap={0}>
              <Bar name="가구 수" dataKey="y">
                {meanAnalysis!.histogram.map((h, idx) => (
                  <Cell
                    key={`mean-histogram-${idx}`}
                    cursor="pointer"
                    fill={
                      h.rank === 0
                        ? graph.green[200]
                        : h.rank === 1
                        ? graph.green[100]
                        : graph.green[50]
                    }
                  />
                ))}
              </Bar>
              <XAxis dataKey="x" hide />
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Flex>
        <Flex alignItems="center" justify="center" direction="column">
          <Text textStyle="h5" width="100%" mb={4}>
            가구별 최종청구금액 종합계약 유리지점 비교
          </Text>
          <ResponsiveContainer width="100%" height={241}>
            <LineChart>
              <XAxis
                dataKey="percentage"
                type="category"
                hide
                allowDuplicatedCategory={false}
              />
              <ReferenceLine
                x={meanAnalysis!.changePer.positiveCount + "%"}
                stroke={graph.red}
                strokeWidth={0.1}
              >
                <Label
                  value={`종합계약 유리지점`}
                  offset={-20}
                  position="top"
                  fontSize={10}
                  fontFamily="'Spoqa Han Sans Neo', 'sans-serif'"
                  fontWeight={500}
                />
              </ReferenceLine>
              <Line
                name="종합계약 유리가구 수"
                type="monotone"
                data={meanAnalysis!.positiveCount}
                dataKey="comp"
                stroke={graph.red}
                dot={false}
                animationDuration={1500}
                strokeWidth={0.1}
                key={"종합계약 유리가구 수"}
              />
              <Line
                name="단일계약 유리가구 수"
                type="monotone"
                data={meanAnalysis!.positiveCount}
                dataKey="single"
                stroke={graph.blue}
                dot={false}
                animationDuration={1500}
                strokeWidth={0.1}
                key={"단일계약 유리가구 수"}
              />
              {meanAnalysis!.targetChks.map((chk, idx) => (
                <ReferenceDot
                  key={`mean-analysis-check-${chk}-${idx}`}
                  x={`${chk}%`}
                  y={meanAnalysis!.positiveCount[chk - minPer]["comp"]}
                  r={8}
                  fill={
                    meanAnalysis!.rank[idx] === 0
                      ? graph.green[200]
                      : meanAnalysis!.rank[idx] === 1
                      ? graph.green[100]
                      : graph.green[50]
                  }
                  stroke="none"
                >
                  <Label
                    value={`${usageNames[idx]} 가구`}
                    offset={16}
                    position="insideBottomLeft"
                    fontSize={10}
                    fontFamily="'Spoqa Han Sans Neo', 'sans-serif'"
                    fontWeight={500}
                  />
                  <Label
                    value={`(${meanAnalysis!.targetKwhs[idx]} kWh)`}
                    offset={5}
                    position="right"
                    fontSize={10}
                    fontFamily="'Spoqa Han Sans Neo', 'sans-serif'"
                    fontWeight={500}
                  />
                </ReferenceDot>
              ))}
              <Tooltip
                labelStyle={{
                  color: modern[500],
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
        <Text textStyle="h2" fontWeight="thin">
          단일계약은
          <br />
          공동설비사용량이 늘어날수록
          <br />
          최소사용량 가구가
          <br />
          손해를 보는 계약입니다.
          <Flex
            direction="row"
            wrap="nowrap"
            alignItems="flex-start"
            mt={6}
            width="100%"
          >
            <Icon as={IoAlertCircleSharp} textStyle="h6" marginRight="6px" />
            <Text textStyle="p2" flex={1}>
              최소사용량 가구의 분포가 적을 경우, 최소사용량 가구의 유리지점과
              <br />
              아파트 종합계약 유리지점 간의 거리가 멀어집니다.
            </Text>
          </Flex>
          <Flex
            direction="row"
            wrap="nowrap"
            alignItems="flex-start"
            mt={2}
            width="100%"
          >
            <Icon as={IoAlertCircleSharp} textStyle="h6" marginRight="6px" />
            <Text textStyle="p2" flex={1}>
              최소사용량 가구의 분포가 2순위여도 가장 많은 분포를 가진 그룹과
              <br />
              누진세 단계가 다르다면, 거리가 멀어집니다.
            </Text>
          </Flex>
        </Text>
      </RecoReportItem>
      <Box />
      <RecoReportItem title="유사도분석치">
        <Text textStyle="h2" fontWeight="thin">
          1년 사용량 패턴 중에서
          <br />
          전체적인 패턴들과
          <br />
          가장 유사한 패턴들로 구성되어
          <br />
          만들어지는 패턴입니다.
        </Text>
        <Flex alignItems="center" justify="center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dpp?.monthUsage}>
              {dpp!.monthUsage.map((m, idx) => (
                <Line
                  name={`${idx + 1}월`}
                  key={m.name}
                  type="monotone"
                  dataKey={idx + 1}
                  stroke={graph.green[100]}
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={0.5}
                  strokeOpacity={0.7}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Flex>
      </RecoReportItem>
      {simAnalysis ? (
        <>
          <RecoReportItem title="유사도분석치 분석 결과">
            <Text textStyle="h2" fontWeight="thin">
              {simAnalysis!.recoIdx.length === 1 ? (
                <>
                  1년 사용량 패턴 중에서
                  <br />
                  <b>
                    {simAnalysis!.recoIdx.map((idx) => idx + 1).join(",")}월
                  </b>
                  이
                  <br />
                  가장 유사도가 높은 패턴입니다.
                  <br />
                </>
              ) : (
                <>
                  1년 사용량 패턴 중에서
                  <br />
                  <b>
                    {simAnalysis!.recoIdx.map((idx) => idx + 1).join(",")}월
                  </b>
                  의
                  <br />
                  평균으로 만들어졌습니다.
                  <br />
                </>
              )}
            </Text>
            <Flex alignItems="center" justify="center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simAnalysis!.monthUsage}>
                  {Object.keys(simAnalysis!.monthUsage[0]).map((k) =>
                    k === "name" ? (
                      <></>
                    ) : (
                      <Line
                        key={k + "-similarity"}
                        type="monotone"
                        name={k !== "mean" ? `${k}월` : "유사도분석치"}
                        dataKey={k}
                        stroke={graph.green[100]}
                        dot={false}
                        isAnimationActive={false}
                        strokeWidth={k === "mean" ? 2.0 : 0.5}
                        strokeOpacity={0.7}
                      />
                    )
                  )}
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Flex>
            <Text textStyle="h2" fontWeight="thin">
              유리 가구 수 측면에서
              <br />
              공동설비사용량{" "}
              <b>{simAnalysis!.analysisData.changePer.positiveCount}%</b>
              <br />
              이하는 <span className="single">단일계약</span>
              <br />
              이상은 <span className="comp">종합계약</span>이 적합해요.
            </Text>
            <Flex alignItems="center" justify="center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simAnalysis!.analysisData.positiveCount}>
                  <XAxis dataKey="percentage" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                  <ReferenceLine
                    x={simAnalysis!.analysisData.changePer.positiveCount + "%"}
                    stroke={graph.red}
                  />
                  <Line
                    name="종합계약"
                    type="monotone"
                    dataKey="comp"
                    stroke={graph.red}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                  <Line
                    name="단일계약"
                    type="monotone"
                    dataKey="single"
                    stroke={graph.blue}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Flex>
          </RecoReportItem>
          <RecoReportItem>
            <Text textStyle="h2" fontWeight="thin" marginBottom="16px">
              아파트 전체 요금,
              <br />
              공동설비사용요금,
              <br />
              평균 손해율 분석 결과입니다.
            </Text>
            <Flex alignItems="center" justify="center" direction="column">
              <Text textStyle="h5" width="100%">
                아파트 전체 요금
              </Text>
              <ResponsiveContainer width="100%" height={241}>
                <LineChart data={simAnalysis!.analysisData.bill}>
                  <XAxis dataKey="percentage" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                  <ReferenceLine
                    x={simAnalysis!.analysisData.changePer.bill + "%"}
                    stroke={graph.red}
                  />
                  <Line
                    name="종합계약"
                    type="monotone"
                    dataKey="comp"
                    stroke={graph.red}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                  <Line
                    name="단일계약"
                    type="monotone"
                    dataKey="single"
                    stroke={graph.blue}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Text textStyle="p2" width="100%">
                공동설비사용량{" "}
                <b>{simAnalysis!.analysisData.changePer.bill}%</b>를 기준으로
                이하는 <span className="single">단일계약</span> 이상은{" "}
                <span className="comp">종합계약</span>이 적합해요.
              </Text>
            </Flex>
            <Flex alignItems="center" justify="center" direction="column">
              <Text textStyle="h5" width="100%">
                평균 손해율
              </Text>
              <ResponsiveContainer width="100%" height={241}>
                <LineChart data={simAnalysis!.analysisData.lossRatio}>
                  <XAxis dataKey="percentage" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                  <ReferenceLine
                    x={simAnalysis!.analysisData.changePer.lossRatio + "%"}
                    stroke={graph.red}
                  />
                  <Line
                    name="종합계약"
                    type="monotone"
                    dataKey="comp"
                    stroke={graph.red}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                  <Line
                    name="단일계약"
                    type="monotone"
                    dataKey="single"
                    stroke={graph.blue}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Text textStyle="p2" width="100%">
                공동설비사용량{" "}
                <b>{simAnalysis!.analysisData.changePer.lossRatio}%</b>를
                기준으로 이하는 <span className="single">단일계약</span> 이상은{" "}
                <span className="comp">종합계약</span>이 적합해요.
              </Text>
            </Flex>
            <Flex alignItems="center" justify="center" direction="column">
              <Text textStyle="h5" width="100%">
                공동설비사용요금
              </Text>
              <ResponsiveContainer width="100%" height={241}>
                <LineChart data={simAnalysis!.analysisData.publicBill}>
                  <XAxis dataKey="percentage" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                  <ReferenceLine
                    x={simAnalysis!.analysisData.changePer.publicBill + "%"}
                    stroke={graph.red}
                  />
                  <Line
                    name="종합계약"
                    type="monotone"
                    dataKey="comp"
                    stroke={graph.red}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                  <Line
                    name="단일계약"
                    type="monotone"
                    dataKey="single"
                    stroke={graph.blue}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Text textStyle="p2" width="100%">
                공동설비사용량{" "}
                <b>{simAnalysis!.analysisData.changePer.publicBill}%</b>를
                기준으로 이하는 <span className="single">단일계약</span> 이상은{" "}
                <span className="comp">종합계약</span>이 적합해요.
              </Text>
            </Flex>
          </RecoReportItem>
          <RecoReportItem title="가구별 평균 한 달 사용량 분포">
            <Text textStyle="h2" fontWeight="thin">
              <>
                해당 아파트는
                <br />
                <Text className="usage" as="span" color={graph.green[50]}>
                  <b>{usageToName[simAnalysis!.analysisData.histWin]}</b>
                </Text>
                가구 쪽에
                <br />
                분포를 많이 보여줍니다.
              </>
            </Text>
            <Flex alignItems="center" justify="center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={simAnalysis!.analysisData.histogram}
                  barCategoryGap={0}
                >
                  <Bar name="가구 수" dataKey="y">
                    {simAnalysis!.analysisData.histogram.map((h, idx) => (
                      <Cell
                        key={`sim-histogram-${idx}`}
                        cursor="pointer"
                        fill={
                          h.rank === 0
                            ? graph.green[200]
                            : h.rank === 1
                            ? graph.green[100]
                            : graph.green[50]
                        }
                      />
                    ))}
                  </Bar>
                  <XAxis dataKey="x" hide />
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Flex>
            <Flex alignItems="center" justify="center" direction="column">
              <Text textStyle="h5" width="100%">
                가구별 최종청구금액 종합계약 유리지점 비교
              </Text>
              <ResponsiveContainer width="100%" height={241}>
                <LineChart>
                  <XAxis
                    dataKey="percentage"
                    type="category"
                    hide
                    allowDuplicatedCategory={false}
                  />
                  <ReferenceLine
                    x={simAnalysis!.analysisData.changePer.positiveCount + "%"}
                    stroke={graph.red}
                    strokeWidth={0.1}
                  />
                  <Line
                    name="종합계약 유리가구 수"
                    type="monotone"
                    data={simAnalysis!.analysisData.positiveCount}
                    dataKey="comp"
                    stroke={graph.red}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={0.1}
                    key={"종합계약 유리가구 수"}
                  />
                  <Line
                    name="단일계약 유리가구 수"
                    type="monotone"
                    data={simAnalysis!.analysisData.positiveCount}
                    dataKey="single"
                    stroke={graph.blue}
                    dot={false}
                    animationDuration={1500}
                    strokeWidth={0.1}
                    key={"단일계약 유리가구 수"}
                  />
                  {simAnalysis!.analysisData.targetChks.map((chk, idx) => (
                    <ReferenceDot
                      key={`similarity-analysis-check-${chk}-${idx}`}
                      x={`${chk}%`}
                      y={
                        simAnalysis!.analysisData.positiveCount[chk - minPer][
                          "comp"
                        ]
                      }
                      r={8}
                      fill={
                        simAnalysis!.analysisData.rank[idx] === 0
                          ? graph.green[200]
                          : simAnalysis!.analysisData.rank[idx] === 1
                          ? graph.green[100]
                          : graph.green[50]
                      }
                      stroke="none"
                    >
                      <Label
                        value={`${usageNames[idx]} 가구`}
                        offset={16}
                        position="insideBottomLeft"
                        fontSize={10}
                        fontFamily="'Spoqa Han Sans Neo', 'sans-serif'"
                        fontWeight={500}
                      />
                      <Label
                        value={`(${
                          simAnalysis!.analysisData.targetKwhs[idx]
                        } kWh)`}
                        offset={5}
                        position="right"
                        fontSize={10}
                        fontFamily="'Spoqa Han Sans Neo', 'sans-serif'"
                        fontWeight={500}
                      />
                    </ReferenceDot>
                  ))}
                  <Tooltip
                    labelStyle={{
                      color: modern[500],
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Flex>
            <Text textStyle="h2" fontWeight="thin">
              단일계약은
              <br />
              공동설비사용량이 늘어날수록
              <br />
              최소사용량 가구가
              <br />
              손해를 보는 계약입니다.
              <Flex
                direction="row"
                wrap="nowrap"
                alignItems="flex-start"
                mt={6}
                width="100%"
              >
                <Icon
                  as={IoAlertCircleSharp}
                  textStyle="h6"
                  marginRight="6px"
                />
                <Text textStyle="p2" flex={1}>
                  최소사용량 가구의 분포가 적을 경우, 최소사용량 가구의
                  유리지점과
                  <br />
                  아파트 종합계약 유리지점 간의 거리가 멀어집니다.
                </Text>
              </Flex>
              <Flex
                direction="row"
                wrap="nowrap"
                alignItems="flex-start"
                mt={2}
                width="100%"
              >
                <Icon
                  as={IoAlertCircleSharp}
                  textStyle="h6"
                  marginRight="6px"
                />
                <Text textStyle="p2" flex={1}>
                  최소사용량 가구의 분포가 2순위여도 가장 많은 분포를 가진
                  그룹과
                  <br />
                  누진세 단계가 다르다면, 거리가 멀어집니다.
                </Text>
              </Flex>
            </Text>
          </RecoReportItem>
        </>
      ) : (
        <Box>
          <Text textStyle="h3" color="modehead" margin="24px 48px">
            유사도분석치 분석은 현재 진행 중 입니다.
            <br />
            잠시 후 결과를 확인해주세요.
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default RecoReportComponent;

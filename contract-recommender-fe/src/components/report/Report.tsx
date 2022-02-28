import { Box } from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import ProcessConnector from "../../store/process/connector";
import ReportItem from "./ReportItem";
import ReportSkeleton from "./ReportSkeleton";

type Props = ConnectedProps<typeof ProcessConnector>;
function Report({ getProcessList, reports }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getProcessList();
  }, [getProcessList]);

  React.useEffect(() => {
    if (reports) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [reports]);

  return loading ? (
    <ReportSkeleton />
  ) : (
    <Box
      display="flex"
      flexWrap="wrap"
      flex="1"
      overflowY="scroll"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        "& > .report-item": {
          marginBottom: "16px",
        },
        "& > .report-item:not(:nth-of-type(3n))": {
          marginRight: "24px",
        },
      }}
    >
      {reports?.map((r) => (
        <ReportItem key={r._id} originalReport={r} />
      ))}
    </Box>
  );
}

export default ProcessConnector(Report);

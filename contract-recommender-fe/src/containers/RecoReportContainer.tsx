import React from "react";
import { ConnectedProps } from "react-redux";
import { useLocation } from "react-router-dom";
import RecoReportComponent from "../components/RecoReportComponent";
import RecoReportSkeleton from "../components/report/RecoReportSkeleton";
import ProcessConnector from "../store/process/connector";

type Props = ConnectedProps<typeof ProcessConnector>;
function RecoReportContainer({ report, getProcess, initProcess }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useLocation() as any;

  React.useEffect(() => {
    if (state) {
      const { id } = state;

      getProcess(id);
    }
  }, [getProcess, state]);

  React.useEffect(() => {
    if (report) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [report]);

  React.useEffect(() => {
    return () => {
      initProcess();
    };
  }, [initProcess]);

  return loading ? (
    <RecoReportSkeleton />
  ) : (
    <RecoReportComponent {...report!} />
  );
}

export default ProcessConnector(RecoReportContainer);

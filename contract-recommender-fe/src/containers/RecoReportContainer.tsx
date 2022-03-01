import React from "react";
import { ConnectedProps } from "react-redux";
import { useLocation } from "react-router-dom";
import RecoReportComponent from "../components/RecoReportComponent";
import RecoReportSkeleton from "../components/report/RecoReportSkeleton";
import ProcessConnector from "../store/process/connector";

type Props = ConnectedProps<typeof ProcessConnector>;
function RecoReportContainer({
  report: originalReport,
  getProcess,
  initProcess,
  ui: { alert },
  confirmAlert,
}: Props) {
  const [reportId, setReportId] = React.useState<string | null>(null);
  const [report, setReport] = React.useState(originalReport);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useLocation() as any;

  React.useEffect(() => {
    if (state) {
      const { id } = state;

      getProcess(id);
    }
  }, [getProcess, state]);

  React.useEffect(() => {
    if (originalReport) {
      setReport(originalReport);
    }
  }, [originalReport]);

  React.useEffect(() => {
    if (originalReport && !reportId) {
      setTimeout(() => {
        const { id } = state;

        setLoading(false);
        setReportId(id);
      }, 1500);
    }
  }, [originalReport, state, reportId]);

  const changeReport = React.useCallback(async () => {
    confirmAlert();
    const { id } = state;

    getProcess(id);
  }, [confirmAlert, getProcess, state]);

  React.useEffect(() => {
    if (alert) {
      if (alert.id === reportId) {
        changeReport();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, reportId]);

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

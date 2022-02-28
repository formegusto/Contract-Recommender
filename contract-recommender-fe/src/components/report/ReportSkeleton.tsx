import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

function ReportSkeletonItem() {
  return (
    <Box
      className="report-item"
      border="1px"
      borderRadius="16px"
      borderColor="modeborder"
      width="292px"
      boxSizing="border-box"
      padding="16px 12px"
      margin="0 0 16px"
    >
      <Skeleton width="100%" height="20px" marginBottom="6px"></Skeleton>
      <Skeleton width="100%" height="180px"></Skeleton>
      <SkeletonText height="54px" noOfLines={3} marginTop="16px" />
    </Box>
  );
}

function ReportSkeleton() {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flex="1"
      overflowY="scroll"
      sx={{
        div: {
          marginBottom: "16px",
        },
        "div:not(:nth-of-type(3n))": {
          marginRight: "24px",
        },
      }}
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <ReportSkeletonItem key={idx} />
      ))}
    </Box>
  );
}

export default ReportSkeleton;

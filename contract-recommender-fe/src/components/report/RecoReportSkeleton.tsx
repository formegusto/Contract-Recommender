import { Box, Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

type Props = {
  title?: boolean;
};
function SkeletonItem({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <Box bgColor="modebox">
      {title && <Skeleton className="title" height="41px" />}
      <Flex
        direction="row"
        margin={`${title ? "0" : "36px"} 48px 32px`}
        wrap="wrap"
        sx={{
          "& > *": {
            minWidth: "474px",
            minHeight: "calc(482px / 2)",
            marginBottom: "16px",
          },
          "& > *:nth-of-type(odd)": {
            marginRight: "16px",
          },
        }}
      >
        {children}
      </Flex>
    </Box>
  );
}
function RecoReportSkeleton() {
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
      <SkeletonItem title>
        <Flex
          direction="column"
          sx={{
            "& > *": {
              width: "100%",
              height: "38px",
              margin: "0 0 8px",
            },
          }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
        <Skeleton />
      </SkeletonItem>
      <SkeletonItem>
        <Flex
          direction="column"
          sx={{
            "& > *": {
              width: "100%",
              height: "38px",
              margin: "0 0 8px",
            },
          }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </SkeletonItem>
      <SkeletonItem title>
        <Flex
          direction="column"
          sx={{
            "& > *": {
              width: "100%",
              height: "38px",
              margin: "0 0 8px",
            },
          }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
        <Skeleton />
      </SkeletonItem>
    </Flex>
  );
}

export default RecoReportSkeleton;

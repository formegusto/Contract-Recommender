import { keyframes } from "@emotion/react";

export const moveRightToLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(10px)
    } to {
        opacity: 1;
        transform: translateX(0px)
    }
`;

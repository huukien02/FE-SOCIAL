import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef } from "react";

interface ScrollBoxProps {
  children: React.ReactNode;
  maxHeight?: number | string;
  scrollToBottom?: boolean;
}

const StyledScrollBox = styled(Box)<{ maxHeight?: number | string }>(
  ({ maxHeight }) => ({
    maxHeight: maxHeight || 400,
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 transparent",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(136, 136, 136, 0.6)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(85, 85, 85, 0.8)",
    },
  })
);

const ScrollBox: React.FC<ScrollBoxProps> = ({
  children,
  maxHeight,
  scrollToBottom,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children, scrollToBottom]);

  return (
    <StyledScrollBox ref={scrollRef} maxHeight={maxHeight}>
      {children}
    </StyledScrollBox>
  );
};

export default ScrollBox;

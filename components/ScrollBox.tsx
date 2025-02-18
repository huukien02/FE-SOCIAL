import { Box } from "@mui/material";
import { styled } from "@mui/system";

interface ScrollBoxProps {
  children: React.ReactNode;
  maxHeight?: number | string;
}

const StyledScrollBox = styled(Box)<{ maxHeight?: number | string }>(
  ({ maxHeight }) => ({
    maxHeight: maxHeight || 400, // Mặc định là 400px nếu không truyền
    overflowY: "auto",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#888 transparent", // Firefox
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

const ScrollBox: React.FC<ScrollBoxProps> = ({ children, maxHeight }) => {
  return <StyledScrollBox maxHeight={maxHeight}>{children}</StyledScrollBox>;
};

export default ScrollBox;

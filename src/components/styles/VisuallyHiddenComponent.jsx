import { styled } from "@mui/material";

const VisuallyHiddenComponent = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    clipPath: "inset(50%)",
    zIndex: 1000,
});


export const ChatInput = styled("input")({
    display:'inline-flex',
    border: '1px solid black',
    borderRadius: "1rem",
    padding: "1rem",
    height: "70%",
    width: "95%",
    "&:focus": {
        outline: "none",
    },
});

export default VisuallyHiddenComponent;

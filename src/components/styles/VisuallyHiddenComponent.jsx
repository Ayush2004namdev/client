import { keyframes, Skeleton, styled } from "@mui/material";
import {Link as Links} from 'react-router-dom'

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

export const Link = styled(Links)({
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
        color: 'black',
        backgroundColor: '#f0f0f0'
    }
})

const bounceAnimation = keyframes`
    0%{ transform : scale(1); }
    50%{ transform : scale(1.5); }
    100%{ transform : scale(1); }
`

export const BouncingSkeleton = styled(Skeleton)(() => ({
    animation:`${bounceAnimation} 1s infinite`
    
}))


export default VisuallyHiddenComponent;

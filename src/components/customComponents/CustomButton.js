import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const BootstrapButton = styled(Button)({
  backgroundColor: "#111b21",
  color: "#fff",
  padding: "8px 20px",
  cursor: "pointer",
  boxShadow: "0 0 20px 1px rgba(0, 0, 0, 0.3)",
  borderRadius: "8px",
  marginTop: "10px",
  textTransform: "none",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#111b21",
    boxShadow: "0 0 20px 1px rgba(0, 0, 0, 0.3)",
  },
});

function CustomButton(props) {
  return (
    <BootstrapButton
      startIcon={
        props.isSubmitting ? (
          <React.Suspense
            fallback={
              <CircularProgress
                style={{
                  margin: 0,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  color: "#fff",
                }}
              />
            }
          >
            <CircularProgress
              style={{
                margin: 0,
                width: 20,
                height: 20,
                marginRight: 10,
                color: "#fff",
              }}
            />
          </React.Suspense>
        ) : null
      }
      type="submit"
      disableRipple
      variant="contained"
      disabled={props.isSubmitting}
    >
      {props.name}
    </BootstrapButton>
  );
}

export default React.memo(CustomButton);

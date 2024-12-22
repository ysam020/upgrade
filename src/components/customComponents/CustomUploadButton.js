import React, { Suspense } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CustomUploadButton = ({ name, onChange, ref }) => {
  return (
    <BootstrapButton
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      onChange={onChange}
      startIcon={
        <Suspense fallback={<div>Loading Icon...</div>}>
          <CloudUploadIcon
            style={{
              margin: 0,
              width: 20,
              height: 20,
              marginRight: 10,
              color: "#fff",
            }}
          />
        </Suspense>
      }
    >
      {name}
      <VisuallyHiddenInput type="file" multiple ref={ref} />
    </BootstrapButton>
  );
};

export default React.memo(CustomUploadButton);

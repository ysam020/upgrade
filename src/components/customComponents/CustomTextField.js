import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

const CustomTextField = ({
  id,
  name,
  label,
  formik,
  type = "text",
  options = [],
  select = false,
  useSpeech,
  children,
  ...rest
}) => {
  const startSpeechRecognition = useSpeechRecognition(formik);

  // Check if Speech Recognition is supported
  const isSpeechRecognitionSupported =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="flex-div" style={{ width: "100%" }}>
      <div style={{ flex: 1 }}>
        <TextField
          select={select}
          type={type}
          size="small"
          margin="dense"
          variant="filled"
          fullWidth
          id={id}
          name={name}
          label={label}
          value={formik.values[name]}
          onChange={formik.handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          className="login-input"
          InputLabelProps={{ shrink: true }}
          {...rest}
        >
          {select &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </div>

      {useSpeech && isSpeechRecognitionSupported && (
        <IconButton onClick={() => startSpeechRecognition(name)}>
          <MicIcon />
        </IconButton>
      )}
    </div>
  );
};

export default React.memo(CustomTextField);

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "../utils/modalStyle";

 function OfflineModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <Box sx={style}>
          <h3 style={{ margin: 0 }}>No Internet Connection!</h3>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(OfflineModal);
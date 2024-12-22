import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import routesConfig from "../routes/routesConfig";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  outline: 0,
  padding: "10px",
};

// Other imports remain the same

function SpotlightModal(props) {
  const { user } = React.useContext(UserContext);
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");
  const [filteredRoutes, setFilteredRoutes] = React.useState([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const suggestionListRef = React.useRef(null);
  const recognitionRef = React.useRef(null);
  const routes = routesConfig(user);
  const alwaysVisibleRoutes = routes
    .filter((route) => route.allowedModules.length === 0)
    .map((route) => route.path);

  React.useEffect(() => {
    if (props.open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.open]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredRoutes([]);
      return;
    }

    const fuse = new Fuse(routes, {
      keys: ["name"],
      threshold: 0.6,
      includeScore: true,
    });

    const filtered = fuse
      .search(value)
      .filter((result) => {
        const route = result.item;
        const isAlwaysVisible = alwaysVisibleRoutes.includes(route.path);
        const moduleAllowed = user.modules.includes(route.name);
        return isAlwaysVisible || moduleAllowed;
      })
      .map((result) => result.item);

    setFilteredRoutes(filtered);
    setHighlightedIndex(0);
  };

  const handleSuggestionClick = (path) => {
    setInputValue("");
    setFilteredRoutes([]);
    props.handleClose();
    navigate(path);
  };

  const handleKeyDown = (event) => {
    if (!suggestionListRef.current) return;

    if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      handleSuggestionClick(filteredRoutes[highlightedIndex].path);
      return;
    }

    const focusableElements = suggestionListRef.current.querySelectorAll("li");
    const firstFocusable = inputRef.current;
    const lastFocusable = focusableElements[filteredRoutes.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => {
        if (filteredRoutes.length === 0) return -1;
        return (prevIndex + 1) % filteredRoutes.length;
      });
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => {
        if (filteredRoutes.length === 0) return -1;
        return (prevIndex - 1 + filteredRoutes.length) % filteredRoutes.length;
      });
    }
  };

  React.useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredRoutes([]);
      return;
    }

    const fuse = new Fuse(routes, {
      keys: ["name"],
      threshold: 0.6,
      includeScore: true,
    });

    const filtered = fuse
      .search(inputValue)
      .filter((result) => {
        const route = result.item;
        const isAlwaysVisible = alwaysVisibleRoutes.includes(route.path);
        const moduleAllowed = user.modules.includes(route.name);
        return isAlwaysVisible || moduleAllowed;
      })
      .map((result) => result.item);

    setFilteredRoutes(filtered);
    setHighlightedIndex(0);
    // eslint-disable-next-line
  }, [inputValue, user?.modules]);

  React.useEffect(() => {
    if (suggestionListRef.current && highlightedIndex >= 0) {
      const highlightedItem =
        suggestionListRef.current.children[highlightedIndex];
      if (highlightedItem) {
        highlightedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex, filteredRoutes]);

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim();
        setInputValue(transcript); // Set the transcript as input value
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  React.useEffect(() => {
    if (!props.open && recognitionRef.current) {
      recognitionRef.current.stop(); // Stop recognition if modal is closed
    }
  }, [props.open]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Box sx={style}>
          <div className="flex-div">
            <SearchIcon />
            <input
              ref={inputRef}
              style={{
                width: "100%",
                border: 0,
                padding: "10px",
                outline: 0,
                borderRadius: 20,
              }}
              placeholder="Search routes..."
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
            />
            <IconButton onClick={handleMicClick}>
              <MicIcon />
            </IconButton>
          </div>
          <div>
            {filteredRoutes.length > 0 && (
              <>
                <hr style={{ marginBottom: "10px" }} />
                <ul
                  ref={suggestionListRef}
                  style={{
                    padding: 0,
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {filteredRoutes.map((route, index) => (
                    <li
                      key={route.path}
                      onClick={() => handleSuggestionClick(route.path)}
                      style={{
                        padding: 10,
                        cursor: "pointer",
                        backgroundColor:
                          highlightedIndex === index ? "#C7DAF2" : "#f0f0f0",
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                      tabIndex={0}
                    >
                      {route.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {filteredRoutes.length === 0 && inputValue && (
              <div style={{ padding: 10 }}>No results found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(SpotlightModal);

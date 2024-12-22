import { useState, useEffect } from "react";
import axios from "axios";

function useChatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I assist you today!" },
  ]);

  // Custom API call to handle messages using axios
  const handleChatbot = async (message) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_STRING}/chatbot`,
        {
          message,
        },
        { withCredentials: true }
      );

      // Assuming API returns { content: "response text" }
      return response.data.answer;
    } catch (error) {
      console.error("Error in API call:", error);
      return "Oops! Something went wrong. Try again."; // Fallback error message
    }
  };

  // Keyboard shortcut to toggle chatbox
  useEffect(() => {
    const handleKeydown = (event) => {
      const chatbotToggler = document.querySelector(".chatbot-toggler");

      // Check if the chatbot is open by inspecting the body class
      const isChatbotOpen = document.body.classList.contains("show-chatbot");

      // Open chatbot with Ctrl+Shift+A or Cmd+Shift+A
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();
        if (chatbotToggler) {
          chatbotToggler.click(); // Simulate click on the button
        }
      }

      // Close chatbot on Escape if it's open
      if (event.key === "Escape" && isChatbotOpen) {
        event.preventDefault();
        if (chatbotToggler) {
          chatbotToggler.click(); // Simulate click again to close
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return { handleChatbot, messages, setMessages };
}

export default useChatbot;

import React from "react";
import { ChatBotWidget } from "chatbot-widget-ui";
import ChatIcon from "@mui/icons-material/Chat";
import useChatbot from "../../hooks/useChatbot";

function Chatbot() {
  const { handleChatbot, messages, setMessages } = useChatbot();
  return (
    <>
      <ChatBotWidget
        callApi={handleChatbot}
        primaryColor="#0B61AE"
        inputMsgPlaceholder="Type your message..."
        chatbotName="Chatbot"
        isTypingMessage="Typing..."
        IncommingErrMsg="Oops! Something went wrong. Try again."
        handleNewMessage={setMessages}
        chatIcon={<ChatIcon />}
        messages={messages}
      />
      <button className="chatbot-toggler" style={{ display: "none" }}>
        Toggle Chatbot
      </button>
    </>
  );
}

export default Chatbot;

import React, { useEffect } from "react";

const DoctorBot = () => {
  useEffect(() => {
    // Inject Botpress Web Chat script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      console.log("Botpress script loaded");

      // Initialize the bot
      window.botpressWebChat.init({
        host: "https://cdn.botpress.cloud/webchat",
        botId: "14002c12-77c8-4e50-b240-ead5f9f0f791",
        messagingUrl: "https://cdn.botpress.cloud/webchat",
        showConversationsButton: false, // hide default floating button
      });
    };
    document.body.appendChild(script);

    // Function to open the bot
    const openBot = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ type: "show" });
      } else {
        setTimeout(openBot, 500); // retry if not ready
      }
    };

    window.openDoctorBot = openBot; // expose globally

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default DoctorBot;

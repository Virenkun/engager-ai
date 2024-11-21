import { useEffect, useRef } from "react";

const ChatbotIntegration = ({ id }: { id: string }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    interface Dimensions {
      width: string;
      height: string;
    }

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "http://localhost:3000") return;
      try {
        const dimensions: Dimensions = JSON.parse(e.data);
        if (iframeRef.current) {
          (iframeRef.current as HTMLIFrameElement).width = dimensions.width;
          (iframeRef.current as HTMLIFrameElement).height = dimensions.height;
          (iframeRef.current as HTMLIFrameElement).contentWindow?.postMessage(
            id,
            "http://localhost:3000/"
          );
        }
      } catch (error) {
        console.error("Invalid message received:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="http://localhost:3000/chatbot"
      style={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
        border: "none",
        backgroundColor: "transparent",
      }}
      className="chat-frame"
    ></iframe>
  );
};

export default ChatbotIntegration;

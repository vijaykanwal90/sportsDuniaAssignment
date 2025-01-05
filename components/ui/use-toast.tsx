import { useState } from "react";

export const useToast = () => {
  const [isToastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Function to show the toast with a given message
  const showToast = (msg: string) => {
    setMessage(msg);
    setToastVisible(true);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000); // You can adjust this time if needed
  };

  return {
    isToastVisible,
    message,
    showToast
  };
};

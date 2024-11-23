import { useRef, useEffect } from "react";

export const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const eventHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", eventHandler);

    return () => {
      console.log("Remove event listener");

      document.removeEventListener("click", eventHandler);
    };
  }, [handler]);

  return domNode;
};

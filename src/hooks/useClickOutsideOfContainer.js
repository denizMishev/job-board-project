import { useRef, useEffect } from "react";

export const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const eventHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", eventHandler);

    return () => {
      document.removeEventListener("mousedown", eventHandler);
    };
  }, [handler]);

  return domNode;
};

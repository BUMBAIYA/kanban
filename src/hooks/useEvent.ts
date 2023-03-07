import { useEffect } from "react";

type EventType = "keydown" | "keypres";

export default function useEvent(
  event: EventType,
  handler: any,
  passive = false
) {
  useEffect(() => {
    window.addEventListener(event, handler, passive);
    return () => {
      window.removeEventListener(event, handler);
    };
  });
}

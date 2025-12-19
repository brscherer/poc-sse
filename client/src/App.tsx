import { useEffect, useState } from "react";

type EventPayload = {
  time: string;
  value: number;
};

function App() {
  const [events, setEvents] = useState<EventPayload[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents((prev) => [...prev, data]);
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Server Sent Events – PoC</h1>

      <ul>
        {events.map((e, idx) => (
          <li key={idx}>
            {e.time} → <strong>{e.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

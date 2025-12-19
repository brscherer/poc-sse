# Server Sent Events POC
## What are Server-Sent Events (SSE)?

### SSE = one-way, persistent HTTP connection

- Server pushes events to the client
- Client listens using EventSource
- Built on plain HTTP
- Text-based (text/event-stream)

### When SSE is a good fit

✅ Real-time dashboards

✅ Notifications

✅ Live logs

✅ Progress updates

### When SSE is NOT ideal

❌ Client → server real-time (use WebSocket)

❌ Binary data

❌ Extremely high fan-out (millions of clients)

## How SSE Works (Protocol Basics)

The server keeps the HTTP connection open and streams data like:
```
data: hello world

data: another message
```

Important headers:
```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

## SSE vs WebSockets (Quick Comparison)
| Feature             | SSE             | WebSocket     |
| ------------------- | --------------- | ------------- |
| Direction           | Server → Client | Bidirectional |
| Protocol            | HTTP            | WS            |
| Simplicity          | Very high       | Medium        |
| Browser support     | Native          | Native        |
| Realtime dashboards | ⭐⭐⭐⭐⭐           | ⭐⭐⭐⭐          |

## QUIC (Emerging alternative)

Modern protocols:

- Multiplexed streams

- Better congestion control

- Connection reuse

## Massive Scale alternatives

Managed infrastructure like:

- Firebase Realtime Database
- Ably
- Pusher
- AWS AppSync
- Supabase Realtime

Why?

- Global edge
- Built-in fan-out
- Automatic reconnection
- Backpressure handled

## Rule of thumb

| Scale           | Best Choice              |
| --------------- | ------------------------ |
| < 10k users     | SSE                      |
| 10k–500k        | WebSockets               |
| 500k+           | Broker + Edge / CDN      |
| Global realtime | Managed realtime service |

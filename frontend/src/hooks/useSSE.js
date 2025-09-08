/*import { useEffect, useRef } from "react";

export default function useSSE({ url, body, onDelta, onDone, onError }) {
  const esRef = useRef(null);

  useEffect(() => {
    if (!url || !body) return;

    const ctrl = new AbortController();
    const headers = { "Content-Type":"application/json", "Accept":"text/event-stream" };
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal
    }).then(async (res) => {
      // If server returned non-OK (like 404 when session not found), surface the error
      if (!res.ok) {
        let text = "";
        try { text = await res.text(); } catch (e) {}
        onError && onError(new Error(text || res.statusText || `HTTP ${res.status}`));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        for (let i = 0; i < parts.length - 1; i++) {
          const line = parts[i].trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") { onDone && onDone(); return; }
          try {
            const json = JSON.parse(payload); // parse JSON properly
            if (json.error) {
              onDelta && onDelta({ error: json.error });
            } else if (json.delta) {
              // Send just the delta text, not the whole object
              onDelta && onDelta(json.delta);
            }
          } catch {
            // ignore malformed chunks
          }
        }
        buffer = parts[parts.length - 1];
      }
      onDone && onDone();
    }).catch(err => onError && onError(err));

    return () => ctrl.abort();
  }, [url, JSON.stringify(body)]);
}
*/

import { useEffect, useRef } from "react";

export default function useSSE({ url, body, onDelta, onDone, onError }) {
  const esRef = useRef(null);

  useEffect(() => {
    if (!url || !body) return;

    const ctrl = new AbortController();
    const headers = { "Content-Type": "application/json", "Accept": "text/event-stream" };
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal
    }).then(async (res) => {
      if (!res.ok) {
        let text = "";
        try { text = await res.text(); } catch (e) {}
        onError && onError(new Error(text || res.statusText || `HTTP ${res.status}`));
        return;
      }

      // Check if streaming is supported
      if (res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          for (let i = 0; i < parts.length - 1; i++) {
            const line = parts[i].trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") { onDone && onDone(); return; }
            try {
              const json = JSON.parse(payload);
              if (json.error) {
                onDelta && onDelta({ error: json.error });
              } else if (json.delta) {
                onDelta && onDelta(json.delta);
              }
            } catch {
              // ignore malformed chunks
            }
          }
          buffer = parts[parts.length - 1];
        }
        onDone && onDone();
      } else {
        // Fallback: read entire response as text
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          if (json.error) {
            onDelta && onDelta({ error: json.error });
          } else if (json.delta) {
            onDelta && onDelta(json.delta);
          }
        } catch {
          onDelta && onDelta(text);
        }
        onDone && onDone();
      }
    }).catch(err => onError && onError(err));

    return () => ctrl.abort();
  }, [url, JSON.stringify(body)]);
}
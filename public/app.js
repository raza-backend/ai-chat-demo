const log = document.getElementById("log");
const form = document.getElementById("form");
const input = document.getElementById("input");
const send = document.getElementById("send");
const history = [];

function addBubble(type, text = "") {
  const el = document.createElement("div");
  el.className = `msg ${type}`;
  el.textContent = text;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
  return el;
}

async function readError(res) {
  try {
    const body = await res.json();
    return body.error || "Something went wrong";
  } catch {
    return "Something went wrong";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const content = input.value.trim();
  if (!content) return;

  addBubble("user", content);
  history.push({ role: "user", content });
  input.value = "";
  send.disabled = true;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-20) }),
    });
    if (!res.ok) throw new Error(await readError(res));

    const bubble = addBubble("assistant");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let reply = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      reply += decoder.decode(value, { stream: true });
      bubble.textContent = reply;
      log.scrollTop = log.scrollHeight;
    }
    if (!reply) throw new Error("No reply received");
    history.push({ role: "assistant", content: reply });
  } catch (err) {
    history.pop();
    addBubble("error", err.message);
  } finally {
    send.disabled = false;
    input.focus();
  }
});

// const API_URL = "http://localhost:8080";

export async function listLogEntries() {
  const response = await fetch(`/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch(`/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

// const url = window.origin;
const url = 'https://travel-log-api-fabdul88.vercel.app';

export async function listLogEntries() {
  const response = await fetch(`${url}/api/listLogEntries`);
  return response.json();
}

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;

  const response = await fetch(`${url}/api/postLogEntry`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}

export async function editLogEntry(entry) {
  const response = await fetch(`${url}/api/postLogEntry/${entry._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) {
    console.log(json);
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}

export async function deleteLogEntry(entry) {
  const response = await fetch(`${url}/api/deleteLogEntry/${entry._id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}

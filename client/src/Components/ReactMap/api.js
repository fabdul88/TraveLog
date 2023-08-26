export async function listLogEntries() {
  const response = await fetch(`/api/listLogEntries`);
  return response.json();
}

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;

  const response = await fetch(`/api/postLogEntry`, {
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
  const response = await fetch(`/api/postLogEntry/${entry._id}`, {
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
  const response = await fetch(`/api/deleteLogEntry/${entry._id}`, {
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

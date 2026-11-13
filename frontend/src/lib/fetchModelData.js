/**
 * fetchModel - Fetch a model from the web server.
 * @param {string} url - The URL to issue the GET request.
 */
async function fetchModel(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("Failed to fetch model data:", err);
    return null;
  }
}

export default fetchModel;

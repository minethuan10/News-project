const NEWS_API_TOKEN = 'Isoh4TXC8az3BtXzE1DC6ZrbjF4m1eD1eQAFndIM';

export const fetchBreakingNews = async () => {
  const API_BASE_URL = `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_TOKEN}&locale=us`;
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch breaking news.');
    }
    const data = await response.json();
    return data.data; // Adjusted based on TheNewsAPI's response structure
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    throw error;
  }
};

export const searchArticles = async (query) => {
  const API_BASE_URL = `https://api.thenewsapi.com/v1/news/all?api_token=${NEWS_API_TOKEN}&search=${encodeURIComponent(query)}&locale=us`;
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch search results.');
    }
    const data = await response.json();
    return data.data; // Adjusted based on TheNewsAPI's response structure
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

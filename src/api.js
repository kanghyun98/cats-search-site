const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('HTTP ERROR');
    }

    return await response.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  getSearchedCats: async (keyword) => {
    const res = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return res?.data;
  },
  getRandomCats: async () => {
    const res = await request(`${API_ENDPOINT}/api/cats/random50`);
    return res?.data;
  },
  getCatInfoById: async (id) => {
    const res = await request(`${API_ENDPOINT}/api/cats/${id}`);
    return res?.data;
  },
};

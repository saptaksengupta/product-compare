import { API_KEY, getBaseUrl } from "./config";

const getSearchUrl = (query) => {
  return `${getBaseUrl()}search?apikey=${API_KEY}&pids=5&q=${query}&format=json`;
};

const searchProducts = (params) => {
  const { query } = params;

  return fetch(getSearchUrl(query)).then((resp) => resp.json()).then((data) => {
    if (data.products) {
      return data.products;
    }
  });
};

const apiService = { getProducts: searchProducts };

export { apiService };

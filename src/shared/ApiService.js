import { API_KEY, getBaseUrl, getRestHeaders } from "./config";
import axios from "axios";

const getSearchUrl = (query) => {
  return `${getBaseUrl()}search?apiKey=${API_KEY}&pids=5&q=${query}&format=json`;
};

const getMockProducts = () => {
  return `http://localhost:3000/mockApi/products.json`;
};

const searchProducts = (params) => {
  const { query } = params;

  return fetch(getMockProducts()).then(resp => resp.json());
};

const apiService = { getProducts: searchProducts };

export { apiService };

const API_BASE_URL = "https://api.bol.com/";

const API_PREFIX = "catalog/v4/";

export const getBaseUrl = () => `${API_BASE_URL}${API_PREFIX}`;

export const API_KEY = "DA31B370BBDF4DE78B57BBEA652ADC94";

export const getRestHeaders = () => {
  return new Headers({
    "Access-Control-Allow-Origin": "*"
  });
};

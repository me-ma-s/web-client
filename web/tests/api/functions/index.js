const axios = require('axios');

const createPostFunc = (url) => {
  const port = 30303;
  return async (obj) => {
    return axios.post(`http://localhost:${port}/api/${url}`, obj);
  }
};

const get = async (url) => {
  const port = 30303;
  return axios.get(`http://localhost:${port}/api/${url}`);
}

module.exports = { createPostFunc, get };

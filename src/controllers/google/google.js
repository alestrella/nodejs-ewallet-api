const axios = require("axios");
const queryString = require("query-string");
const URL = require("url");

const {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../../config/vars");

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/auth/google-redirect`,
    scope: [],
  });
};

module.exports = googleAuth;

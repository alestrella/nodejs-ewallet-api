const queryString = require("query-string");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const {
  BASE_URL,
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../../config/vars");
const { User } = require("../../models/user");
const { updateTokens } = require("../../services/updateTokens");
const { sendEmail } = require("../../helpers");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  // ------ SINGUP AND LOGIN ------
  const { email, name } = userData.data;
  let user = await User.findOne({ email });
  if (!user) {
    const password = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      email,
      password: hashPassword,
      username: name,
    });
    await sendEmail(user);
  }
  const userId = user._id;
  const tokens = await updateTokens(userId);

  return res.redirect(
    `${FRONTEND_URL}?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}&email=${email}&username=${name}`
  );
};

module.exports = googleRedirect;

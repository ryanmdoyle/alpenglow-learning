// Takes context within an Apollo mutation, verifies the user from a cookie, and returns the user data
const jwt = require('jsonwebtoken');

const verifyUser = (context) => {
  const userToken = context.cookies.token;
  if (!userToken) return null;
  const user = jwt.verify(userToken, process.env.SECRET);
  return user;
}

module.exports = verifyUser;
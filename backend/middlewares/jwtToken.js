const sendToken = (user, statusCode, res) => {
  // Get jwt token form user modal
  const token = user.getJwtToken();

  // Set options for cookies
  // --ex: cookie expiry time save method

  options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;

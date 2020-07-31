const authorizeUser = (req, res, next) => {
  const { ALPS_AT, ALPS_RT } = req.cookies;
  if (ALPS_AT || ALPS_RT) {
    try {
      if (!ALPS_AT) throw new Error;
      // try to validate token, if it's validated set user on req
      const tokenData = jwt.verify(ALPS_AT, process.env.AUTH_SECRET);
      req.currentUser = tokenData;
    } catch {
      // if token invalid, try to refresh using refresh token
      try {
        if (!ALPS_RT) throw new Error;
        const refresh = jwt.verify(ALPS_RT, process.env.REF_SECRET); // if invalid exits to catch block
        const verifiedUser = Auth.verifyUserInDb(refresh._id);
        const newAuthToken = Auth.createAuthToken(verifiedUser);
        const newRefreshToken = Auth.createRefreshToken(verifiedUser);
        res.cookie('ALPS_AT', newAuthToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000), // 1000 * 60 * 15
        });
        res.cookie('ALPS_RT', newRefreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 604800000), // 1000 * 60 * 60 * 24 * 7
        });
        req.currentUser = refresh;
      } catch {
        req.currentUser = null;
      }
    }
  } else {
    req.currentUser = null;
  }
  next();
}

module.exports = authorizeUser;
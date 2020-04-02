const logout = async (req, res) => {
  function clear() {
    res.clearCookie('token');
    res.send('Bye!')
  }
  clear();
}

module.exports = logout;
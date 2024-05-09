const sendCookie = (user = {}, statusCode, res) => {
  console.log("user in sendCookie",user)
  const token = user.generateToken();
  console.log("Generated token:", token);
 

   res.status(statusCode).json({
    success: true,
    user,
    token
      
  });
};

module.exports = sendCookie;

const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;
  
  // Check if the token is not provided
  if (!token) {
    return res.status(401).send({
      message: "Token is not provided, please login",
      status: 2
    });
  }

  // Verify the token using the secret key "harshan"
  jwt.verify(token, "harshan", (err, decode) => {
    // Check if there's an error during token verification
    if (err) {
      // If error, return a 401 Unauthorized response
      return res.status(401).send({
        message: "Token is not valid, please login",
        status: 2
      });
    }

    // If token is valid, extract the userId from the decoded payload
    req.body.user = decode.userId;
    
    // Call the next middleware function in the stack
    next();
  });
}

module.exports = { authenticator };

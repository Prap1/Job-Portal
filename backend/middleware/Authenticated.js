import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    // First, check for token in cookies or Authorization header
    let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    // If there's no token, respond with an error
    if (!token) {
      return res.status(401).json({
        message: "Please login first.",
        success: false,
      });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Set the user ID in req.id (this will be used in the route handlers)
    req.id = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

export default authenticate;

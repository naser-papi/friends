import jwt from "jsonwebtoken";

export function verifyTokenMW(req, res, next) {
  try {
    let token = req.header("Authorization");
    if (!token) throw new Error("No token provided");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

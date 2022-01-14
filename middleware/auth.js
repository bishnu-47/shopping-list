import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const auth = async (req, res, next) => {
  // extract token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ msg: "Invalid Authorization!" });
  }

  try {
    // verify jwt token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) throw err;

      // find user based on decoded data
      const user = await User.findById(decoded.id);

      // if no user found
      if (!user) return res.status(401).json({ msg: "Invalid Authorization!" });

      // add the data to request for routes
      req.user = user;
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: e.message });
  }
};

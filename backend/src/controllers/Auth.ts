import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/Utils";
import User, { IUserSchema } from "../models/User";

/*Register User*/
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } =
      req.body;

    if (!password || password.length < 5) {
      throw new Error("invalid password");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      roles: ["User"],
      occupation
    });

    const savedUser = await newUser.save();
    await sendEmail(email, `<h1>please click link blow to conform your account</h1>`);
    delete savedUser.password;
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* Login User*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = (await User.findOne({ email: email })) as IUserSchema;
    if (!user) throw new Error("invalid email");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

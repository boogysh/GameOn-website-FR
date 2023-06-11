import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      quantity,
      tournments,
      terms,
      informed,
    } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      birthDate,
      quantity,
      tournments,
      terms,
      informed,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

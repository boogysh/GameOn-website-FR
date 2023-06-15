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

export const getUsers = async (req, res) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// exports.getMessage = (req, res, next) => {
//   MSG.find()
//     .sort({ createdAt: -1 })
//     // .sort({ clientInfo: req.clientInfo })

//     .then((messages) => res.status(200).json(messages))
//     .catch((error) => res.status(400).json({ error }));
// };

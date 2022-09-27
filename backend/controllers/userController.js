import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

// desc Authentic User & get token
// @route POST /api/users/login
// Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

// desc Register a new User
// @route POST /api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("User Already Exist");
	}
	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
});
// desc Get user profile
// @route POST /api/users/profile
// @Access Private

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});

// desc Update user profile
// @route PUT /api/users/profile
// @Access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		(user.name = req.body.name || user.name),
			(user.email = req.body.email || user.email);
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.name,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});

// desc Get All Users
// @route GET /api/users
// @Access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});
// desc DELETE A Users
// @route DELETE /api/users/:id
// @Access Private/Admin

const deleteUsers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({ message: "User Removed" });
	}
	res.status(404);
	throw new Error("User Not Found");
});
// desc GET A User Id
// @route GET /api/users/:id
// @Access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	if (user) {
		res.json(user);
	}
	res.status(404);
	throw new Error("User Not Found");
});

// desc Update user
// @route PUT /api/users/:id
// @Access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		(user.name = req.body.name || user.name),
			(user.email = req.body.email || user.email);
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.name,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUsers,
	getUserById,
	updateUser,
};

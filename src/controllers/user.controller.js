import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //Get user details from front end/ postman
  //validation - not empty
  //check if user already exists - check email, username
  //Required files are provided images, avatar
  //upload them to cloudinary - get url from the response (validate avatar)
  //create user object - create entry in DB
  //remove password and refreshTOken fields from response
  //check for user creation response
  //return response

  // * Get user details
  const { username, email, fullname, password } = req.body;
  console.log("mail: ", email);

  // * validation
  // TODO: use ZOD for verification
  if (
    [fullname, emmail, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError();
  }

  // * Check if user already exist
  const existedUser = User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or Username already exists");
  }

  // * Handle images
  //req.files came from multer
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log(req, "req");
  // console.log(req.files, "req-files");
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // * Upload files to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // * Create user object - create entry in DB
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // * Remove password and refreshTOken fields from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // * Check for user creation response
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // * Return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };

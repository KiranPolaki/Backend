import { asyncHandler } from "../utils/asyncHandler.js";

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
});

export { registerUser };

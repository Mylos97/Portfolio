const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

// When doing a signed upload, you'll use a function like this:
exports.handler = async function(event, context) {
  console.log(event.body)
  //const res = await cloudinary.uploader.upload(file, { ...JSON.parse(event.body) });
  return {
    statusCode: 200,
    body: JSON.stringify('hovsa')
  };
};
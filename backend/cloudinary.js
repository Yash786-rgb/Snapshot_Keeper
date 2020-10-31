require("dotenv").config();
var cloudinary = require("cloudinary").v2;
console.log(process.env.ClOUD_NAME);
cloudinary.config({
  cloud_name: process.env.ClOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
function uploadImageFn(url, username) {
  // console.log("username is : " + username);
  var nameOfPreset = "host" + username + "API";
  var nameOfFolder = "host" + username + "API" + "_folder";
  // console.log(nameOfPreset);
  // console.log(nameOfFolder);
  console.log("name of Preset ", nameOfPreset);
  console.log("name of Folder", nameOfFolder);
  cloudinary.api.create_upload_preset(
    {
      name: nameOfPreset,
      folder: nameOfFolder,
    },
    function (error, result) {
      if (error) console.log(error);
      console.log(result);
    }
  );
  cloudinary.uploader
    .upload(url, {
      upload_preset: nameOfPreset,
    })
    .then(() => {
      if(err) console.log(err);
      else console.log("done");
    });
}
function getImagesFn(username) {
  console.log("username is : " + username);
  var nameOfFolder = "host" + username + "API" + "_folder";
  return new Promise(async (resolve, reject) => {
    const { resources } = await cloudinary.search
      .expression(nameOfFolder)
      .max_results(15)
      .execute();
    console.log("resis");
    console.log(resources);
    const publicIds = resources.map((r) => {
      return r.url;
    });
    resolve(publicIds);
  }).catch((err)=>{
    console.log(err);
  });
}
module.exports = { uploadImageFn, getImagesFn };

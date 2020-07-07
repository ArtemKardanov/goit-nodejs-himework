const AvatarGenerator = require("avatar-generator");
const path = require("path");
const fs = require("fs");
const User = require("../users/users.model");

async function avatarToDelete(avatarURL) {
  fs.promises.unlink(path.join(__dirname, "../public", avatarURL));
}

async function avatarToGenerate(req) {
  const { email } = req.body;

  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: path.join(__dirname, "./sprites"),
    imageExtension: ".png",
  });

  const currentUser = await User.getUserByEmail(email);

  if (currentUser) {
    avatarToDelete(currentUser.avatarURL);
  }

  const generatedImage = await avatar.generate(email);
  const imgName = email.split("@")[0] + `_${Date.now()}.png`;
  const savedAvatarPath = "../tmp" + imgName;
  const newAvatarPath = "../public/images" + imgName;

  await generatedImage.png().toFile(`../tmp/${imgName}`);
  await fsPromises.copyFile(savedAvatarPath, newAvatarPath);
  await fsPromises.unlink(savedAvatarPath);

  return `images/${imgName}`;
}

module.exports.avatarToDelete = avatarToDelete;
module.exports.avatarToGenerate = avatarToGenerate;


const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dykuhzsa7', 
  api_key: '685231419468457', 
  api_secret: 'gOkQiEfXnD4HYPCLRtDs2yv-Xw8' 
});

module.exports = {cloudinary}
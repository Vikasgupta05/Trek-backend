const multer  = require('multer')
const path=require("path")


    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            // console.log("__dirname", __dirname+"/../uplaod")
            callback(null, (path.join(__dirname, "../upload")))
        },

        filename: function (req, file, callback) {
            const uniqueprefix= Date.now() + '-' + Math.round(Math.random() * 1E9)
            callback(null, uniqueprefix + file.originalname)
        },
    })
  


    function fileFilter (req, file,callback) {
        if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
            callback(null, true)
        }
        else{
            callback(null, false)
        }
    }

    const upload = multer({
        storage,
        fileFilter,
        limits: {
         fileSize: 1024 * 1024 * 5,
        },
    });

    const uploadSingle = (fileKey) => {
        return function (req, res, next) {
            const uploadItem = upload.single(fileKey);
            
            uploadItem(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(err.message);
                } else if (err) {
                    return res.status(500).send(err.message);
                }
                next();
            });
        };
    };
  
module.exports = { upload, uploadSingle };
  
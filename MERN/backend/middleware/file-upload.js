const multer = require('multer');
const uuid = require('uuid/v1')
const MIME_TYPE = {
    'image/png' : 'png',
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',

}
const fileUpload = multer({
    limits : 500000,
    storage : multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null,'uploads/images');
        },
        filename:(req,file,cb) =>{
            const ext = MIME_TYPE(file.mimetype);
            cb(null,uuid() + '.' + ext); 
        }   
    })
});
module.exports = fileUpload;
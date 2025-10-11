import { error } from "console";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+"_"+path.extname(file.originalname));

    },
});


const fileFilter =  (req,file,cb) =>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(ext){
        cb(null,true)
    }else{
        cb(new error("Please select image only"))
    }


};


const upload = multer({storage,fileFilter});

export default upload;
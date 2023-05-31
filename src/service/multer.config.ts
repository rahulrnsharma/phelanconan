import { diskStorage } from "multer";

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req,file,callback)=>{
            const uniqueSuffix = Date.now()+'-'+Math.random();
            callback(null,file.fieldname+'-'+uniqueSuffix+'.'+file.originalname.split('.').pop());
            
        }
    })
}
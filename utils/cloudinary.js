import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import fs from 'fs' ;



// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
    secure: true, 
});
  
// Upload an image
const uploadOnCloudinary = async (filePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type : 'auto'
      };
    try{
        if(!filePath) return null;
        const uploadResponse = await cloudinary.uploader
       .upload( filePath, options )
       return uploadResponse;

    }
    catch(err){
        fs.unlinkSync(filePath); // removes locally saved file
        return null;
    }
}

const deleteOnCloudinary = async (public_id) => {
    try{
        if(!public_id) return null;
        const deleteResponse = await cloudinary.uploader
       .destroy( public_id );
       return deleteResponse;
    }
    catch(err){
        // removes locally saved file
        console.log(err);
        return null;
    }
}

const uploadLargeOnCloudinary = async (videoFilePath,name) => {
    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type : 'auto'
          };
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(videoFilePath, options, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        });
        return uploadResult;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(videoFilePath); // removes locally saved file
        return null;
    }
}

export {
    uploadOnCloudinary,
    deleteOnCloudinary,
    uploadLargeOnCloudinary
}
    /* // Upload an image
     const uploadResult = async function(filePath) {
        await cloudinary.uploader
       .upload(
           filePath, {
               public_id: 'shoes',
               resource_type : 'auto'
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    }
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = async function() {
        cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    }
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = async function() { cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);  
    }      */

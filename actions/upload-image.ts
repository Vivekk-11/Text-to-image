"use server";
import cloudinary from "cloudinary";
import sharp from "sharp";

export const uploadImage = async ({ image }: { image: File }) => {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality: 80 })
      .toBuffer();
    const result = await new Promise<cloudinary.UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream((error, response) => {
            if (error) return reject(error);
            if (!response) return reject(new Error("No Cloudinary response"));
            resolve(response);
          })
          .end(compressedBuffer);
      }
    );

    return result.secure_url;
  } catch (error) {
    console.log("Error uploading image", error);
    return null;
  }
};

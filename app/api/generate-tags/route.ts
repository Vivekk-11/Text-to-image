import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getRunId } from "@/actions/get-run-id";
import { uploadImage } from "@/actions/upload-image";

export async function POST(req: NextRequest) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true,
  });

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const BearerToken = process.env.NEXT_PUBLIC_COMFY_API_KEY_2!;

    if (!image)
      return NextResponse.json({
        message: "Please provide an image",
        status: 400,
      });

    const input_image = await uploadImage({ image });

    if (!input_image)
      return NextResponse.json({
        message: "Something went wrong, please try again",
        status: 400,
      });

    const runId = await getRunId({
      body: JSON.stringify({
        deployment_id: process.env.COMFY_DEPLOYMENT_ID_2,
        inputs: {
          input_image,
        },
      }),
      BearerToken,
    });

    if (!runId)
      return NextResponse.json({
        message: "Error generating image tags",
        status: 500,
      });

    return NextResponse.json({ runId, image: input_image });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({
      message: "Error generating tags",
      status: 500,
    });
  }
}

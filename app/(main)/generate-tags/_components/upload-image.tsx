import { useUpdateGenerateResponse } from "@/store/generate-response";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

export const UploadImage = () => {
  const { updateGeneratedResponse, updateIsLoading, updateUploadedImage } =
    useUpdateGenerateResponse((state) => state);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isPending) return;
    startTransition(async () => {
      try {
        const files = event.target.files;
        if (!files) {
          toast.error("Please provide an image");
          return;
        }

        const file = files.item(0);

        if (!file) {
          toast.error("Please provide an image");
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast.error("Image's size shouldn't be more than 10mb");
          return;
        }

        const image = URL.createObjectURL(file);
        updateUploadedImage(image);

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/generate-tags`,
          {
            method: "POST",
            body: formData,
          }
        );

        const response = await res.json();
        if (!res.ok) {
          toast.error(response.message);
          return;
        }

        toast.success("Generated image tags successfully");

        updateGeneratedResponse({
          image: response.image,
          tags: response.tags,
          prompt: "",
        });
      } catch (error) {
        console.error("ERROR", error);
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    updateIsLoading(isPending);
  }, [isPending, updateIsLoading]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10">
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        name="Review Images"
        id="review-images"
        onChange={handleFileChange}
        hidden
      />
      <label
        htmlFor="review-images"
        className="rounded-[2.5px] p-5 border border-white h-10 w-full flex items-center justify-center gap-x-2.5 cursor-pointer"
      >
        <FaCamera color="white" size={30} />
        <span className="text-white font-normal text-[22px] leading-[16px]">
          Add Photo
        </span>
      </label>
    </div>
  );
};

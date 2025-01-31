"use client";

import { fetchInterval } from "@/actions/fetch-interval";
import { useUpdateGenerateResponse } from "@/store/generate-response";
import { FormEvent, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export const TextInput = () => {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const { updateGeneratedResponse, updateIsLoading } =
    useUpdateGenerateResponse((state) => state);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setText("");

    if (isPending) return;

    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: text,
          }),
        }
      );

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.message);
        return;
      }

      const runId = response.runId;

      const fetchedResponse = await fetchInterval({
        BearerToken: process.env.NEXT_PUBLIC_COMFY_API_KEY!,
        runId,
      });

      if (!fetchedResponse) {
        toast.error("Something went wrong, please try again");
        return;
      }

      const image = fetchedResponse.outputs?.[0]?.data?.images?.[0]?.url;

      toast.success("Generated image successfully");
      updateGeneratedResponse({
        image,
        prompt: text,
        tags: [],
      });
    });
  };

  useEffect(() => {
    updateIsLoading(isPending);
  }, [isPending, updateIsLoading]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 h-10 fixed left-1/2 -translate-x-1/2 bottom-4"
    >
      <div className="w-full relative rounded-3xl bg-slate-50 h-full py-2">
        <input
          value={text}
          onChange={({ target }) => setText(target.value)}
          className="px-1.5 outline-none absolute rounded-3xl top-0 left-1 w-[92.5%] h-full"
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2"
          type="submit"
        >
          {isPending ? (
            <FaSpinner
              size={25}
              color="#5F5853"
              className="cursor-default infinite-rotate"
            />
          ) : (
            <IoSend size={25} color="#5F5853" />
          )}
        </button>
      </div>
    </form>
  );
};

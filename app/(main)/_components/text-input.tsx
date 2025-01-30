"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";

export const TextInput = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setText("");

    const res = await fetch("http://localhost:3000/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      toast.error(response.message);
      return;
    }

    // TODO: ADD the generated image to zustand
  };

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
          <IoSend size={25} />
        </button>
      </div>
    </form>
  );
};

"use client";

import { FormEvent } from "react";
import { IoSend } from "react-icons/io5";

export const TextInput = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // TODO: Submit text, and generate an image
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 h-10 fixed left-1/2 -translate-x-1/2 bottom-4"
    >
      <div className="w-full relative rounded-3xl bg-slate-50 h-full py-2">
        <input className="px-1.5 outline-none absolute rounded-3xl top-0 left-1 w-[92.5%] h-full" />
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

import Image from "next/image";
import { UserButton } from "./user-button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full p-7 mobile:p-4">
      <nav className="w-full flex items-center justify-between">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dz3tveb47/image/upload/v1738090602/image_11_-Photoroom_jui327.png"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-[200px] h-[50px] object-cover"
          />
        </Link>
        <UserButton />
      </nav>
    </header>
  );
};

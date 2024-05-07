import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

const Logo = () => {
  return (
    <Link className="block text-teal-600 dark:text-teal-300 w-fit" href="/">
      <Image
        src={logo}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
    </Link>
  );
};

export default Logo;

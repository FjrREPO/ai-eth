import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/logo.jpg"}
      width={17}
      height={17}
      className="w-10 rounded-full"
      alt="logo"
    />
  );
}
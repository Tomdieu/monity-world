import Image from "next/image";

export default function SplashScreen() {
  return (
    <div
      className="flex-1 w-full h-full flex items-center justify-center bg-[url('/images/background.png')]"
    >
      <Image
        alt="Monity-world"
        src={"/icons/Logo.png"}
        width={271}
        height={124.31}
        className="w-60 h-28"
      />
    </div>
  );
}

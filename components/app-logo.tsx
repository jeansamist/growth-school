import { FunctionComponent } from "react";
import logo from "@/assets/images/app-logo.svg";
import Image from "next/image";
export const AppLogo: FunctionComponent<{ className: string }> = (props) => {
  return (
    <Image
      width={1920}
      height={1080}
      {...props}
      src={logo}
      alt="Growth School"
    />
  );
};

import { FunctionComponent } from "react";
import bg from "@/assets/images/background.png";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
export const HomeHero: FunctionComponent = () => {
  return (
    <div className={"relative w-full px-6 lg:px-12 mx-auto"}>
      <Image
        width={1920}
        height={1080}
        src={bg}
        alt="background"
        className={"w-full object-cover z-0 hidden lg:block"}
      />
      <div className="block lg:hidden aspect-[3.5/6] sm:aspect-[4/3] bg-primary-soft rounded-[20px]"></div>
      <div className="absolute z-10 inset-0 px-6 lg:px-12 flex items-center">
        <div className="px-6 lg:px-12 xl:px-24 w-full lg:w-2/3 text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
              Accédez aux meilleures formations , Ebooks et Templates
            </h1>
            <p className=" leading-normal lg:w-3/5 text-xl">
              Des formations de qualité, des modèles efficaces et des ebooks
              complets pour booster votre succès
            </p>
          </div>
          <a href="#" className={buttonVariants({ variant: "secondary" })}>
            Parcourir les categories{" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.01761 13.0019H19.584L16.293 16.293C15.3477 17.2383 16.7657 18.6562 17.711 17.7109L20.7082 14.709L22.709 12.705C23.0968 12.3149 23.0968 11.6849 22.709 11.2948L17.711 6.29097C17.5208 6.09556 17.2591 5.98593 16.9864 5.98819C16.0862 5.98831 15.6444 7.08475 16.293 7.70898L19.5918 11H1.96585C0.579464 11.0688 0.68298 13.0709 2.01761 13.0019Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

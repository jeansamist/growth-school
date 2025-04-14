import Image, { StaticImageData } from "next/image";
import { FunctionComponent } from "react";

export type CategoryCardProps = {
  name: string;
  cover: StaticImageData | string;
  id?: number;
};

export const CategoryCard: FunctionComponent<CategoryCardProps> = ({
  name,
  cover,
  id,
}) => {
  return (
    <a
      href={"/items?category=" + id?.toString()}
      className={"rounded-3xl bg-primary-soft"}
    >
      <Image
        width={1920}
        height={1080}
        src={cover}
        alt={name}
        className={"w-full aspect-[512/306] object-cover rounded-2xl"}
      />
      <div className="p-6 text-xl sm:text-2xl font-bold">
        {name.toLocaleUpperCase()}
      </div>
    </a>
  );
};

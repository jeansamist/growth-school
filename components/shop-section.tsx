import { FunctionComponent } from "react";
import { CategoryCard, CategoryCardProps } from "@/components/ui/category-card";
import { buttonVariants } from "./ui/button";
export const ShopSection: FunctionComponent<{
  categories: CategoryCardProps[];
}> = ({ categories }) => {
  return (
    <div
      className={
        "w-full px-6 lg:px-12 mx-auto py-16 space-y-14 flex flex-col items-center"
      }
    >
      <div className="space-y-4 text-center">
        <h1 className=" font-bold text-4xl sm:text-5xl lg:text-[50px] text-balance">
          Explorez notre boutique numérique
        </h1>
        <p className=" leading-normal lg:w-3/5 text-xl mx-auto">
          Trouvez votre prochaine compétence gagnante: Explorez notre catalogue
          de formations & ebooks
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {categories.map((category, index) => {
          return (
            <CategoryCard
              key={index}
              cover={category.cover}
              name={category.name}
            />
          );
        })}
      </div>
      <a
        href="/categories"
        className={buttonVariants({ variant: "secondary" })}
      >
        Parcourir toutes les catégories
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
  );
};

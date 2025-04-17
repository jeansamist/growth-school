"use client";
import { FunctionComponent, useState } from "react";
import { ItemCard, ItemCardProps } from "./ui/item-card";

export type TrainingsSectionProps = { trainings: ItemCardProps[] };

export const TrainingsSection: FunctionComponent<TrainingsSectionProps> = ({
  trainings,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [item, setItem] = useState<ItemCardProps>(trainings[0]);
  return (
    <div className={"bg-primary-soft"}>
      <div
        className={
          "w-full px-6 lg:px-12 mx-auto py-16 space-y-14 flex flex-col items-start"
        }
      >
        <div className="space-y-4 w-full text-center">
          <h1 className=" font-bold text-4xl sm:text-5xl lg:text-[50px] text-balance">
            Nouveaux produits & <br /> tendances numériques
          </h1>
        </div>

        <div className="w-full flex items-center gap-6 justify-center flex-wrap">
          {trainings.map((b, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl max-w-[300px] w-full"
            >
              <ItemCard
                setItem={setItem}
                openModal={() => setIsOpen(true)}
                {...b}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

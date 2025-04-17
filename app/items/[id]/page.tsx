import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import stars from "@/assets/images/stars.png";
import { CameraIcon, File, MoveIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailPageModal } from "@/components/details-page-modal";
import { Metadata } from "next";
import axios from "axios";
import { redirect } from "next/navigation";
import { Extra } from "@/components/ui/extra";

export const metadata: Metadata = {
  title: "Details | Growth school",
  description: "Decouvrez les livres et les cours de la growth school",
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: itemId } = await params;
  const TAGS = await prisma.tag.findMany();
  const item = await prisma.item.findUnique({
    where: { id: Number(itemId) },
    include: {
      tags: true,
      category: {
        include: {
          items: true,
        },
      },
      files: true,
    },
  });
  if (item === null) {
    return null;
  }
  return (
    <>
      <DetailPageModal
        item={{
          id: item.id,
          cover: item.cover,
          discount_percentage: item.discount
            ? (item.discount / item.price) * 100
            : undefined,
          average_rate: 5,
          title: item.title,
          price: item.price,
          tags: TAGS.filter((bdTag) =>
            item.tags.some((tag) => tag.tagId === bdTag.id)
          ).map((tag) => ({ name: tag.name, id: tag.id })),
        }}
      />
      <div className="px-6 lg:px-12 mx-auto py-16 space-y-12 !pt-6">
        <div className="font-bold">
          <Link className="text-primary" href={"/"}>
            Accueil /
          </Link>
          <Link
            className="text-primary"
            href={"/items/?category=" + item?.categoryId.toString()}
          >
            {item?.category.name} /
          </Link>
          <span className="opacity-70">{item?.title} /</span>
        </div>
        <div className="flex gap-6 xl:gap-12 flex-col xl:flex-row">
          {item?.category.id === 1 ? (
            <div>
              <Image
                src={item.cover}
                width={600}
                height={1000}
                alt={item?.title}
                className="!h-auto aspect-video object-cover rounded-xl"
              />
            </div>
          ) : (
            <div className="max-w-[600px] w-full">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 space-y-4">
                  <Image
                    src={item.cover}
                    width={600}
                    height={600}
                    alt=""
                    className="!w-full aspect-square object-cover rounded-xl"
                  />
                  <Image
                    src={item.cover}
                    width={600}
                    height={600}
                    alt=""
                    className="!w-full aspect-square object-cover rounded-xl"
                  />
                  <Image
                    src={item.cover}
                    width={600}
                    height={600}
                    alt=""
                    className="!w-full aspect-square object-cover rounded-xl"
                  />
                </div>
                <div className="col-span-3">
                  <Image
                    src={item.cover}
                    width={600}
                    height={1000}
                    alt=""
                    className="!h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-6 lg:space-y-12">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
              {item.title}
            </h1>
            <div className="flex gap-4 items-center">
              <Image
                src={stars}
                alt=""
                width={160}
                height={24}
                className="object-contain"
              />
              <span className="text-2xl font-bold">4.0</span>
            </div>
            <div className="opacity-70 leading-normal text-balance lg:text-lg xl:text-xl">
              {item.description}
            </div>
            {item.categoryId === 2 && (
              <>
                <div className="flex gap-6 items-start">
                  <div>
                    <div className="text-secondary text-sm">Ecrit par</div>
                    <div className="font-bold">
                      {item.author || "Non precise"}
                    </div>
                  </div>
                  <div>
                    <div className="text-secondary text-sm">Edition</div>
                    <div className="font-bold">
                      {item.edition || "Non precise"}
                    </div>
                  </div>
                  <div>
                    <div className="text-secondary text-sm">Annee</div>
                    <div className="font-bold">{"2025"}</div>
                  </div>
                </div>
              </>
            )}
            {item.categoryId === 1 && (
              <div className="flex gap-6 items-center font-bold">
                <div className="flex items-center gap-6">
                  <File className="text-secondary" size={24} />
                  <span>
                    {item.modules?.split(",").length.toString()} Modules
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  {item.categoryId === 1 && (
                    <Video className="text-secondary" size={24} />
                  )}
                  <span>Format video</span>
                </div>
              </div>
            )}
            <div className="border-2 border-gray-400/70 border-dashed"></div>
            <Extra item={item} />
            <div className="border-2 border-gray-400/70 border-dashed mb-6"></div>
            <div className="px-4 py-2 font-bold rounded-xl bg-primary/15 text-sm mb-6">
              Une fois le paiement effectué, vous recevrez un Msg WhatsApp
              contenant un lien de téléchargement.
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 w-full mb-12">
          <div className="space-y-6 flex-1">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
              {item.categoryId === 1 ? "Contenu du cours" : "Details"}
            </h1>
            {item.categoryId === 2 ? (
              <div className="text-lg">
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">Titre</div>
                  <div className="flex-1 opacity-70">{item.title}</div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">Auteur</div>
                  <div className="flex-1 opacity-70">
                    {item.author || "Non precise"}
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">ISBN</div>
                  <div className="flex-1 opacity-70">
                    {item.isbn || "Non precise"}
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">Langue</div>
                  <div className="flex-1 opacity-70">
                    {item.language || "Non precise"}
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">Format</div>
                  <div className="flex-1 opacity-70">
                    Paper back, {item.pages?.toString() || "Non precise"} Pages
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">
                    Date de publication
                  </div>
                  <div className="flex-1 opacity-70">
                    {item.date || "Non precise"}
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">
                    Edition
                  </div>
                  <div className="flex-1 opacity-70">
                    {item.edition || "Non precise"}
                  </div>
                </div>
                <div className="py-4 px-6 border-t border-primary-soft flex">
                  <div className="w-[175px] md:w-[300px] font-bold">
                    Mots cles
                  </div>
                  <div className="flex-1 opacity-70 space-x-4">
                    {TAGS.filter((bdTag) =>
                      item.tags.some((tag) => tag.tagId === bdTag.id)
                    ).map((tag) => (
                      <span
                        className="p-2 text-xs rounded-xl bg-primary/15 text-primary font-bold"
                        key={tag.id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-lg">
                {item.modules?.split(",").map((f, k) => (
                  <div
                    className="py-4 px-6 border-t border-primary-soft flex"
                    key={k}
                  >
                    <div className="w-[175px] md:w-[300px] font-bold">
                      Module {k + 1}
                    </div>
                    <div className="flex-1 opacity-70">
                      {f || "Cour " + (k + 1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6 max-w-[600px] w-full">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
              {item.categoryId === 1
                ? "Formations similaires"
                : "Livres similaires"}
            </h1>
            <div className="space-y-4">
              {item.category.items.map((i, k) => (
                <div className="flex gap-4" key={k}>
                  <Image
                    src={i.cover}
                    width={100}
                    height={100}
                    alt=""
                    className="aspect-[140/196] !h-auto object-cover rounded-xl"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h1 className="font-bold">{i.title}</h1>
                      <div className="text-sm  text-primary">
                        {item.category.name}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center font-bold text-xl text-[#FF754C]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.3899 11.6C21.6646 11.3192 21.8559 10.9676 21.9424 10.5845C22.029 10.2013 22.0073 9.80161 21.8799 9.43002C21.7604 9.05733 21.5386 8.72569 21.2398 8.47288C20.941 8.22006 20.5773 8.05622 20.1899 8.00002L15.8999 7.34002C15.8799 7.33422 15.8615 7.32403 15.8459 7.31019C15.8303 7.29635 15.818 7.27921 15.8099 7.26002L13.9299 3.26002C13.7651 2.88546 13.4949 2.56692 13.1522 2.34321C12.8095 2.11949 12.4092 2.00025 11.9999 2.00002C11.5954 1.99835 11.1991 2.11353 10.8585 2.33173C10.5179 2.54993 10.2475 2.86186 10.0799 3.23002L8.19994 7.23002C8.18968 7.24952 8.1755 7.26669 8.15829 7.28046C8.14108 7.29423 8.12122 7.30429 8.09994 7.31002L3.81994 8.00002C3.43203 8.05781 3.06776 8.22206 2.76764 8.47452C2.46751 8.72698 2.2433 9.05774 2.11994 9.43002C1.99723 9.8029 1.97896 10.2023 2.0671 10.5848C2.15524 10.9673 2.34643 11.3184 2.61994 11.6L5.77994 14.85C5.78903 14.8705 5.79373 14.8926 5.79373 14.915C5.79373 14.9374 5.78903 14.9596 5.77994 14.98L5.03994 19.52C4.97114 19.9154 5.01599 20.3222 5.16926 20.6931C5.32253 21.064 5.57794 21.3838 5.90577 21.6152C6.23361 21.8467 6.62042 21.9804 7.02122 22.0007C7.42203 22.021 7.82037 21.9272 8.16994 21.73L11.8999 19.66C11.9185 19.6504 11.939 19.6453 11.9599 19.6453C11.9808 19.6453 12.0014 19.6504 12.0199 19.66L15.7499 21.73C16.1 21.9229 16.4972 22.0134 16.8963 21.9913C17.2953 21.9691 17.6801 21.835 18.0065 21.6045C18.333 21.374 18.5881 21.0563 18.7425 20.6877C18.897 20.319 18.9446 19.9144 18.8799 19.52L18.1899 15C18.1794 14.9818 18.1739 14.9611 18.1739 14.94C18.1739 14.919 18.1794 14.8983 18.1899 14.88L21.3899 11.6Z"
                          fill="#FF754C"
                        />
                      </svg>
                      <span>4</span>
                    </div>
                    <div className="font-bold">{i.price} FCFA</div>
                    <Link
                      href={"/items/" + i.id.toString() + "/buy"}
                      className="text-primary"
                    >
                      Acheter maintenant
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

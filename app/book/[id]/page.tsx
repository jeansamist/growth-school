import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import stars from "@/assets/images/stars.png";
import { CameraIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailPageModal } from "@/components/details-page-modal";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: bookId } = await params;
  const TAGS = await prisma.tag.findMany();
  const book = await prisma.item.findUnique({
    where: { id: Number(bookId) },
    include: {
      tags: true,
      category: true,
      files: true,
    },
  });
  if (book === null) {
    return null;
  }
  return (
    <div className="container  px-6 lg:px-12 mx-auto space-y-12 pt-6">
      <DetailPageModal
        book={{
          id: book.id,
          cover: book.cover,
          discount_percentage: book.discount
            ? (book.discount / book.price) * 100
            : undefined,
          average_rate: 5,
          title: book.title,
          price: book.price,
          tags: TAGS.filter((bdTag) =>
            book.tags.some((tag) => tag.tagId === bdTag.id)
          ).map((tag) => ({ name: tag.name, id: tag.id })),
        }}
      />
      <div className="font-bold">
        <Link className="text-primary" href={"/"}>
          Accueil /
        </Link>
        <Link
          className="text-primary"
          href={"/book/?category=" + book?.categoryId.toString()}
        >
          {book?.category.name} /
        </Link>
        <span className="opacity-70">{book?.title} /</span>
      </div>
      <div className="flex gap-6 xl:gap-12 flex-col xl:flex-row">
        {book?.category.id === 1 && (
          <div>
            <Image
              src={book.cover}
              width={600}
              height={1000}
              alt={book?.title}
              className="!h-auto aspect-video object-cover rounded-xl"
            />
          </div>
        )}
        <div className="flex-1 space-y-6 lg:space-y-12">
          <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
            {book.title}
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
            {book.description}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris.
          </div>

          <div className="flex gap-6 items-start">
            <div>
              <div className="text-secondary text-sm">Ecrit par</div>
              <div className="font-bold">{book.author || "Non precise"}</div>
            </div>
            <div>
              <div className="text-secondary text-sm">Edition</div>
              <div className="font-bold">{book.edition || "Non precise"}</div>
            </div>
            <div>
              <div className="text-secondary text-sm">Annee</div>
              <div className="font-bold">{"2025"}</div>
            </div>
          </div>

          <div className="border-2 border-gray-400/70 border-dashed"></div>

          <div className="flex gap-6 items-center font-bold">
            <div className="flex items-center gap-6">
              <File className="text-secondary" size={24} />
              <span>{book.files.length.toString()} Modules</span>
            </div>
            <div className="flex items-center gap-6">
              {book.categoryId === 1 && (
                <CameraIcon className="text-secondary" size={24} />
              )}
              <span>{book.files.length.toString()} Modules</span>
            </div>
          </div>
          <div className="border-2 border-gray-400/70 border-dashed"></div>
          <div className="w-full flex justify-between items-center">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance text-primary">
              {book.discount && (book.discount / book.price) * 100 > 0
                ? Math.ceil(
                    book.price -
                      (book.price * (book.discount / book.price) * 100) / 100
                  )
                : book.price}{" "}
              FCFA
            </h1>
            <Button variant={"secondary"}>Acheter maintenant</Button>
          </div>
          <div className="border-2 border-gray-400/70 border-dashed mb-6"></div>
          <div className="px-4 py-2 font-bold rounded-xl bg-primary/15 text-sm mb-6">
            Une fois le paiement effectué, vous recevrez un Msg WhatsApp
            contenant un lien de téléchargement.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">
          Details
        </h1>
        <div className="text-lg">
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Titre</div>
            <div className="flex-1 opacity-70">{book.title}</div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Autheur</div>
            <div className="flex-1 opacity-70">
              {book.author || "Non precise"}
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">ISBN</div>
            <div className="flex-1 opacity-70">
              {book.isbn || "Non precise"}
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Langue</div>
            <div className="flex-1 opacity-70">
              {book.language || "Non precise"}
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Format</div>
            <div className="flex-1 opacity-70">
              Paper back, {book.pages?.toString() || "Non precise"} Pages
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Date de publication</div>
            <div className="flex-1 opacity-70">
              {book.date || "Non precise"}
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Edition</div>
            <div className="flex-1 opacity-70">
              {book.edition || "Non precise"}
            </div>
          </div>
          <div className="py-4 px-6 border-t border-primary-soft flex">
            <div className="w-[300px] font-bold">Mots cles</div>
            <div className="flex-1 opacity-70 space-x-4">
              {TAGS.filter((bdTag) =>
                book.tags.some((tag) => tag.tagId === bdTag.id)
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
      </div>
    </div>
  );
}

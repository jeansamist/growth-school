import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="container  px-6 lg:px-12 mx-auto space-y-12 pt-6">
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
      <div className="flex gap-6 flex-col xl:flex-row">
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
      </div>
    </div>
  );
}

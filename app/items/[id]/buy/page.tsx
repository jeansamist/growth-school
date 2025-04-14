import { CommandModal } from "@/components/command-modal";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Acheter | Growth school",
  description: "Decouvrez les livres et les cours de la growth school",
};
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: itemId } = await params;
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
    <div>
      <CommandModal
        isOpen
        item={{
          id: item.id,
          cover: item.cover,
          discount_percentage: item.discount
            ? (item.discount / item.price) * 100
            : undefined,
          average_rate: 5,
          title: item.title,
          price: item.price,
          tags: [],
        }}
      />
    </div>
  );
}

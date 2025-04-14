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
  const { id: bookId } = await params;
  return <div>page</div>;
}

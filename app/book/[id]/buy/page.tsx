import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: bookId } = await params;
  return <div>page</div>;
}

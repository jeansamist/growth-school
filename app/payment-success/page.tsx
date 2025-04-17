// "use ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import axios from "axios";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { itemid } = await searchParams;
  const id = Array.isArray(itemid)
    ? parseFloat(itemid[0])
    : parseFloat(itemid || "");

  const sendMessage = async (data: FormData) => {
    "use server";
    const id = data.get("id") as string;
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
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
      return;
    }
    const phone = data.get("phone") as string;
    await axios.post(
      "https://server11.vps.webdock.cloud/send",
      {
        number: phone,
        key: "Tpa1Ow1s6ZnaUM-mUwaJdaVLhJrxbQNH",
        message: `*🎉 Merci pour votre achat !*

Votre lien de téléchargement est : ${item?.files
          .map((file) => file.url)
          .join(" - ")}
Profitez bien de votre ebook/formation ! 😊

Team Growthschool`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    redirect("/");
  };

  return (
    <div className="px-6 lg:px-12 mx-auto py-16 space-y-12 !pt-6">
      <div className="space-y-4 text-center flex flex-col items-center">
        <Check size={112} className="text-primary" />
        <h1 className=" font-bold text-4xl sm:text-5xl lg:text-[50px] text-balance">
          Paiement effectué avec succès
        </h1>
        <p className=" leading-normal lg:w-3/5 text-xl mx-auto">
          Entrez votre contact WhatsApp pour recevoir le lien de téléchargement
        </p>
        <form action={sendMessage} className="space-y-2 max-w-[260px] w-full">
          <div className="space-y-4">
            <Label>
              Numero de telephone<span className="text-red-500">*</span>
            </Label>
            <input type="hidden" name="id" value={id.toString()} />
            <Input type="tel" name="phone" className=" w-full" />
          </div>
          <Button className="w-full">Envoyer</Button>
        </form>
      </div>
    </div>
  );
}

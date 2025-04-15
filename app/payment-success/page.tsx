import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="px-6 lg:px-12 mx-auto py-16 space-y-12 !pt-6">
      <div className="space-y-4 text-center">
        <Check size={112} className="text-primary" />
        <h1 className=" font-bold text-4xl sm:text-5xl lg:text-[50px] text-balance">
          Paiement effectué avec succès
        </h1>
        <p className=" leading-normal lg:w-3/5 text-xl">
          Vous avez recus le lien de votre achat directement sur WhatsApp.{" "}
          <Link href={"/"} className="text-primary underline">
            Je n'ai pas recus de message
          </Link>
        </p>
      </div>
    </div>
  );
}

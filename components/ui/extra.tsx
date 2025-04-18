"use client";
import axios from "axios";
import { FunctionComponent } from "react";
import { Item } from "@/app/generated/prisma";
import { Button, buttonVariants } from "./button";
import wa from "@/assets/images/wa.png";
import Image from "next/image";

export type ExtraProps = {
  item: Item;
};

export const Extra: FunctionComponent<ExtraProps> = ({ item }) => {
  return (
    <div className={""}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const phone = formData.get("phone") as string;
          const transaction = await axios.post<{
            status: "Accepted" | false;
            authorization_url: string;
          }>(
            "https://api.notchpay.co/payments",
            {
              amount: item.discount
                ? item.price -
                  (item.price * (item.discount / item.price) * 100) / 100
                : item.price,
              currency: "XAF",
              callback:
                "https://growth-schools.com/payment-success?itemid=" +
                item.id?.toString(),
              customer: {
                phone: phone,
              },
            },
            {
              headers: {
                Authorization:
                  "pk.6hBKpdwpQwTShbbv9A1HWSXQ65ujLP1RVoGyCSYpuixcfVLMxysQGGoa0UViCVFLFT4S8vs5xLbHxEDWDOMGcgyYYLioKCK16gfaiOEbaGYj4jO1gKR9nMzMf7UDH",
              },
            }
          );
          if (transaction.data.status === "Accepted") {
            window.location.assign(transaction.data.authorization_url);
          } else {
            alert("Une erreur s'est produite");
          }
        }}
        className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6"
      >
        <h1 className=" font-bold text-2xl sm:text-5xl lg:text-6xl text-balance text-primary">
          {item.discount && (item.discount / item.price) * 100 > 0
            ? Math.ceil(
                item.price -
                  (item.price * (item.discount / item.price) * 100) / 100
              ).toString() + " FCFA"
            : item.price + " FCFA"}
          {item.discount && (
            <span className="text-[#AAAAAA] text-lg text text-ral line-through">
              {item.price} FCFA
            </span>
          )}
        </h1>
        <div className="flex gap-4 items-center flex-col md:flex-row w-full md:w-auto">
          <Button variant="secondary" className="flex-1 w-full md:w-auto">
            Acheter maintenant
          </Button>
          <a
            href={
              "https://wa.me/237671700380?text=" +
              encodeURIComponent(
                "Bonjour, Je voudrais en savoir plus sur " + item.title
              )
            }
            className={buttonVariants({
              className: "!bg-[#67D449] flex-1 w-full md:w-auto",
            })}
          >
            <Image src={wa} alt="" className="w-10 rounded-full bg-white" />
            Discuter avec nous sur WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
};

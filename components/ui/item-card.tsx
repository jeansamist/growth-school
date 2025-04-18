import { FunctionComponent } from "react";
import placeholder from "@/assets/images/item-placeholder.png";
import { Button } from "./button";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/navigation";
export type ItemCardProps = {
  id?: number; // not require
  cover?: string;
  discount_percentage?: number;
  average_rate: number;
  title: string;
  price: number;
  tags: { name: string; id: number }[];
  openModal?: () => void;
  setItem?: React.Dispatch<React.SetStateAction<ItemCardProps>>;
};

export const ItemCard: FunctionComponent<ItemCardProps> = ({
  id,
  cover,
  discount_percentage,
  average_rate,
  title,
  price,
  tags,
  openModal,
  setItem,
}) => {
  return (
    <div className={"w-full"}>
      <div className="relative w-full">
        <Image
          width={1920}
          height={1080}
          src={cover || placeholder}
          alt={title}
          className="aspect-[239/336] rounded-xl object-cover w-full"
        />
        {discount_percentage && discount_percentage > 0 && (
          <div className="absolute left-0 top-6 bg-secondary text-white font-semibold text-xl px-4 py-3 rounded-r-xl">
            {Math.ceil(discount_percentage)}%
          </div>
        )}
      </div>
      <div className="py-4">
        <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-primary space-x-2">
            {tags.map((tag, i) => (
              <a key={i} href={"/items?tag=" + tag.id.toString()}>
                {tag.name}
              </a>
            ))}
          </p>
          <b className="text-secondary flex items-center gap-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.39 11.6C21.6647 11.3192 21.856 10.9676 21.9425 10.5845C22.0291 10.2013 22.0074 9.80161 21.88 9.43002C21.7605 9.05733 21.5387 8.72569 21.2399 8.47288C20.9411 8.22006 20.5774 8.05622 20.19 8.00002L15.9 7.34002C15.88 7.33422 15.8616 7.32403 15.846 7.31019C15.8304 7.29635 15.8181 7.27921 15.81 7.26002L13.93 3.26002C13.7652 2.88546 13.4949 2.56692 13.1523 2.34321C12.8096 2.11949 12.4093 2.00025 12 2.00002C11.5955 1.99835 11.1992 2.11353 10.8585 2.33173C10.5179 2.54993 10.2476 2.86186 10.08 3.23002L8.20003 7.23002C8.18977 7.24952 8.17559 7.26669 8.15838 7.28046C8.14117 7.29423 8.12131 7.30429 8.10003 7.31002L3.82003 8.00002C3.43212 8.05781 3.06785 8.22206 2.76773 8.47452C2.4676 8.72698 2.24339 9.05774 2.12003 9.43002C1.99733 9.8029 1.97905 10.2023 2.0672 10.5848C2.15534 10.9673 2.34652 11.3184 2.62003 11.6L5.78003 14.85C5.78913 14.8705 5.79383 14.8926 5.79383 14.915C5.79383 14.9374 5.78913 14.9596 5.78003 14.98L5.04003 19.52C4.97124 19.9154 5.01608 20.3222 5.16935 20.6931C5.32263 21.064 5.57803 21.3838 5.90586 21.6152C6.2337 21.8467 6.62051 21.9804 7.02131 22.0007C7.42212 22.021 7.82046 21.9272 8.17003 21.73L11.9 19.66C11.9186 19.6504 11.9391 19.6453 11.96 19.6453C11.9809 19.6453 12.0015 19.6504 12.02 19.66L15.75 21.73C16.1001 21.9229 16.4973 22.0134 16.8963 21.9913C17.2954 21.9691 17.6801 21.835 18.0066 21.6045C18.3331 21.374 18.5882 21.0563 18.7426 20.6877C18.897 20.319 18.9447 19.9144 18.88 19.52L18.19 15C18.1795 14.9818 18.174 14.9611 18.174 14.94C18.174 14.919 18.1795 14.8983 18.19 14.88L21.39 11.6Z"
                fill="#E84057"
              />
            </svg>
            {average_rate.toString()}
          </b>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <b className="text-lg">
          {discount_percentage && discount_percentage > 0
            ? Math.ceil(price - (price * discount_percentage) / 100)
            : price}{" "}
          FCFA
        </b>
        {discount_percentage && discount_percentage > 0 && (
          <span className="text-[#AAAAAA] text-sm text-ral line-through">
            {price} FCFA
          </span>
        )}
      </div>
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
              amount: discount_percentage
                ? price - price * (discount_percentage / 100)
                : price,
              currency: "XAF",
              callback:
                "https://growth-schools.com/payment-success?itemid=" +
                id?.toString(),
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
            redirect(transaction.data.authorization_url);
          } else {
            alert("Une erreur s'est produite");
          }
        }}
        className="pt-4 flex gap-2"
      >
        <Button
          onClick={() => {
            if (setItem && openModal) {
              openModal();
              setItem({
                cover,
                discount_percentage,
                average_rate,
                title,
                price,
                tags,
                id,
              });
            }
          }}
          className="flex-1"
        >
          Acheter
        </Button>
        <Link
          href={"/items/" + id?.toString()}
          className="w-14 h-14 border flex items-center justify-center rounded-xl opacity-70"
        >
          <Eye />
        </Link>
      </form>
    </div>
  );
};

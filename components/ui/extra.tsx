import axios from "axios";
import { FunctionComponent } from "react";
import { ItemCardProps } from "./item-card";
import { Item } from "@/app/generated/prisma";
import { Button } from "./button";

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
                  "pk_test.IVpvcz4hnzbLhpVOsCylN5tn886fHUc2GVMKQWm3MpGeeyedyYhji6QbfUL5KD1Yvi6sAKIkpRAs2BD7HoOh4HYzrSmWcYZBfOp6wJYnp0xLNhRP7B30KpWDKg1c6",
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
        <Button variant="secondary">Acheter maintenant</Button>
      </form>
    </div>
  );
};

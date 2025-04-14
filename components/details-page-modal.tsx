"use client";
import { FunctionComponent, useState } from "react";
import { CommandModal } from "./command-modal";
import { ItemCardProps } from "./ui/item-card";

export type DetailPageModalProps = {
  item: ItemCardProps;
};

export const DetailPageModal: FunctionComponent<DetailPageModalProps> = ({
  item,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemState, setItem] = useState<ItemCardProps>(item);
  return (
    <div className={""}>
      <CommandModal
        isOpen={isOpen}
        item={itemState}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

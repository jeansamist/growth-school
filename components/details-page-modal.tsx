"use client";
import { FunctionComponent, useState } from "react";
import { CommandModal } from "./command-modal";
import { BookCardProps } from "./ui/book-card";

export type DetailPageModalProps = {
  book: BookCardProps;
};

export const DetailPageModal: FunctionComponent<DetailPageModalProps> = ({
  book,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookState, setBook] = useState<BookCardProps>(book);
  return (
    <div className={""}>
      <CommandModal
        isOpen={isOpen}
        book={bookState}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

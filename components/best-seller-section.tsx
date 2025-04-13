"use client";
import { FunctionComponent, useState } from "react";
import { BookCard, BookCardProps } from "./ui/book-card";
import { cn } from "@/lib/utils";
import { CommandModal } from "./command-modal";

export const BestSellerSection: FunctionComponent<{
  books: BookCardProps[];
}> = ({ books }) => {
  const pages = books.length / 6;
  const pagesArray = Array.from({ length: pages }, (_, i) => i);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [book, setBook] = useState<BookCardProps>(books[0]);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <CommandModal
        isOpen={isOpen}
        book={book}
        onClose={() => setIsOpen(false)}
      />
      <div
        className={
          "w-full px-6 lg:px-12 mx-auto py-16 space-y-14 flex flex-col items-start"
        }
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between w-full">
          <div className="space-y-4">
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-[50px] text-balance">
              Meilleures ventes
            </h1>
            <p className=" leading-normal lg:w-3/5 text-xl">
              Découvrez nos best-sellers
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="cursor-pointer"
              onClick={() =>
                setCurrentPage(
                  currentPage !== 0 ? currentPage - 1 : currentPage
                )
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#3E3289" />
              <path
                d="M12.8334 16.44L18.1667 22.44C18.2835 22.5724 18.4481 22.6531 18.6243 22.6644C18.8006 22.6756 18.9741 22.6165 19.1067 22.5C19.2392 22.3832 19.3199 22.2186 19.3312 22.0424C19.3424 21.8661 19.2833 21.6926 19.1667 21.56L14.2268 16L19.1667 10.44C19.2745 10.3062 19.3265 10.136 19.3118 9.96481C19.2971 9.79366 19.2169 9.63478 19.088 9.52129C18.959 9.40781 18.7912 9.34849 18.6196 9.35569C18.448 9.36289 18.2857 9.43607 18.1667 9.55995L12.8334 15.56C12.7265 15.6816 12.6676 15.838 12.6676 16C12.6676 16.1619 12.7265 16.3183 12.8334 16.44Z"
                fill="white"
              />
            </svg>
            {pagesArray.map((p, i) => (
              <div
                key={i}
                onClick={() => setCurrentPage(p)}
                className={cn(
                  "bg-primary-soft h-3 w-3 rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer",
                  p === currentPage && "bg-primary"
                )}
              />
            ))}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="rotate-180 cursor-pointer"
              onClick={() =>
                setCurrentPage(
                  currentPage + 1 < pagesArray.length
                    ? currentPage + 1
                    : currentPage
                )
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#3E3289" />
              <path
                d="M12.8334 16.44L18.1667 22.44C18.2835 22.5724 18.4481 22.6531 18.6243 22.6644C18.8006 22.6756 18.9741 22.6165 19.1067 22.5C19.2392 22.3832 19.3199 22.2186 19.3312 22.0424C19.3424 21.8661 19.2833 21.6926 19.1667 21.56L14.2268 16L19.1667 10.44C19.2745 10.3062 19.3265 10.136 19.3118 9.96481C19.2971 9.79366 19.2169 9.63478 19.088 9.52129C18.959 9.40781 18.7912 9.34849 18.6196 9.35569C18.448 9.36289 18.2857 9.43607 18.1667 9.55995L12.8334 15.56C12.7265 15.6816 12.6676 15.838 12.6676 16C12.6676 16.1619 12.7265 16.3183 12.8334 16.44Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-10">
          {books.slice(currentPage * 6, (currentPage + 1) * 6).map((b, i) => (
            <BookCard
              setBook={setBook}
              openModal={() => setIsOpen(true)}
              {...b}
              key={i * (currentPage + 1)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

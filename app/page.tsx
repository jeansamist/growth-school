import { BestSellerSection } from "@/components/best-seller-section";
import { FeatureBookSection } from "@/components/feature-book-section";
import { HomeHero } from "@/components/home-hero";
import { ShopSection } from "@/components/shop-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { BookCardProps } from "@/components/ui/book-card";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Accueil | Growth school",
  description: "Decouvrez les livres et les cours de la growth school",
};
export default async function Home() {
  const dbCategories = await prisma.category.findMany();
  const categories = dbCategories.map((category) => ({
    id: category.id,
    name: category.name,
    cover: category.cover,
  }));
  const bdTags = await prisma.tag.findMany();
  const dbBooks = await prisma.item.findMany({ include: { tags: true } });
  const books: BookCardProps[] = dbBooks.map((book) => ({
    id: book.id,
    cover: book.cover,
    discount_percentage: book.discount
      ? (book.discount / book.price) * 100
      : undefined,
    average_rate: 5,
    title: book.title,
    price: book.price,
    tags: bdTags
      .filter((bdTag) => book.tags.some((tag) => tag.tagId === bdTag.id))
      .map((tag) => ({ name: tag.name, id: tag.id })),
  }));
  return (
    <>
      <HomeHero />
      <ShopSection categories={categories} />
      <BestSellerSection books={books} />
      <FeatureBookSection />
      <TestimonialSection />
    </>
  );
}

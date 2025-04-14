import { BestSellerSection } from "@/components/best-seller-section";
import { FeatureItemSection } from "@/components/feature-item-section";
import { HomeHero } from "@/components/home-hero";
import { ShopSection } from "@/components/shop-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { ItemCardProps } from "@/components/ui/item-card";
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
  const dbItems = await prisma.item.findMany({ include: { tags: true } });
  const items: ItemCardProps[] = dbItems.map((item) => ({
    id: item.id,
    cover: item.cover,
    discount_percentage: item.discount
      ? (item.discount / item.price) * 100
      : undefined,
    average_rate: 5,
    title: item.title,
    price: item.price,
    tags: bdTags
      .filter((bdTag) => item.tags.some((tag) => tag.tagId === bdTag.id))
      .map((tag) => ({ name: tag.name, id: tag.id })),
  }));
  return (
    <>
      <HomeHero />
      <ShopSection categories={categories} />
      <BestSellerSection items={items} />
      <FeatureItemSection />
      <TestimonialSection />
    </>
  );
}

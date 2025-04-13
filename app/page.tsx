import { BestSellerSection } from "@/components/best-seller-section";
import { FeatureBookSection } from "@/components/feature-book-section";
import { HomeHero } from "@/components/home-hero";
import { ShopSection } from "@/components/shop-section";
import { TestimonialSection } from "@/components/testimonial-section";
export default function Home() {
  const books = [
    {
      cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
      discount_percentage: 10,
      average_rate: 4.5,
      title: "The Alchemist",
      price: 18 * 550,
      tags: [
        { name: "Fiction", id: 1 },
        { name: "Adventure", id: 2 },
      ],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg",
      discount_percentage: 15,
      average_rate: 4.7,
      title: "Atomic Habits",
      price: 22 * 550,
      tags: [
        { name: "Self-help", id: 3 },
        { name: "Productivity", id: 4 },
      ],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg",
      discount_percentage: 5,
      average_rate: 4.6,
      title: "Rich Dad Poor Dad",
      price: 16 * 550,
      tags: [
        { name: "Finance", id: 5 },
        { name: "Mindset", id: 6 },
      ],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71UwSHSZRnS.jpg",
      average_rate: 4.3,
      title: "The Subtle Art of Not Giving a F*ck",
      price: 20 * 550,
      tags: [{ name: "Psychology", id: 7 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
      average_rate: 4.8,
      title: "To Kill a Mockingbird",
      price: 15 * 550,
      tags: [
        { name: "Classic", id: 8 },
        { name: "Drama", id: 9 },
      ],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81dQwQlmAXL.jpg",
      discount_percentage: 20,
      average_rate: 4.7,
      title: "Thinking, Fast and Slow",
      price: 25 * 550,
      tags: [{ name: "Cognitive Science", id: 10 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
      average_rate: 4.6,
      title: "The Power of Now",
      price: 19 * 550,
      tags: [{ name: "Spirituality", id: 11 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg",
      average_rate: 4.4,
      title: "12 Rules for Life",
      price: 21 * 550,
      tags: [{ name: "Philosophy", id: 12 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
      average_rate: 4.5,
      title: "Deep Work",
      price: 23 * 550,
      tags: [
        { name: "Productivity", id: 4 },
        { name: "Focus", id: 13 },
      ],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
      average_rate: 4.7,
      title: "Can't Hurt Me",
      price: 24 * 550,
      tags: [{ name: "Motivation", id: 14 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/91OINeHnJGL.jpg",
      discount_percentage: 12,
      average_rate: 4.2,
      title: "The 4-Hour Workweek",
      price: 26 * 550,
      tags: [{ name: "Lifestyle", id: 15 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71uAI28kJuL.jpg",
      average_rate: 4.6,
      title: "Zero to One",
      price: 18 * 550,
      tags: [{ name: "Startup", id: 16 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81drfTT9ZfL.jpg",
      average_rate: 4.4,
      title: "Becoming",
      price: 22 * 550,
      tags: [{ name: "Biography", id: 17 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/61Iz2yy2CKL.jpg",
      average_rate: 4.1,
      title: "The Lean Startup",
      price: 19 * 550,
      tags: [{ name: "Business", id: 18 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71aLultW5EL.jpg",
      average_rate: 4.3,
      title: "Hooked",
      price: 17 * 550,
      tags: [{ name: "Design", id: 19 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81vpsIs58WL.jpg",
      average_rate: 4.7,
      title: "The Pragmatic Programmer",
      price: 30 * 550,
      tags: [{ name: "Programming", id: 20 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71X6mnUDSzL.jpg",
      average_rate: 4.9,
      title: "Clean Code",
      price: 28 * 550,
      tags: [{ name: "Software Engineering", id: 21 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71u0tDRNJHL.jpg",
      average_rate: 4.4,
      title: "The Psychology of Money",
      price: 20 * 550,
      tags: [{ name: "Finance", id: 5 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/71aG+xDKSYL.jpg",
      average_rate: 4.8,
      title: "Start With Why",
      price: 22 * 550,
      tags: [{ name: "Leadership", id: 22 }],
    },
    {
      cover: "https://m.media-amazon.com/images/I/81Afzr7P2-L.jpg",
      average_rate: 4.6,
      title: "Good to Great",
      price: 27 * 550,
      tags: [{ name: "Management", id: 23 }],
    },
  ];
  return (
    <>
      <HomeHero />
      <ShopSection />
      <BestSellerSection books={books} />
      <FeatureBookSection />
      <TestimonialSection />
    </>
  );
}

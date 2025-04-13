"use client";
import { FunctionComponent, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  TestimonialsCard,
  TestimonialsCardProps,
} from "@/components/ui/testimonial-card";

export type TestimonialSectionProps = {};

export const TestimonialSection: FunctionComponent<
  TestimonialSectionProps
> = () => {
  const [testimonials, setTestimonials] = useState<TestimonialsCardProps[]>([
    {
      profileImg: "/profile1.png",
      testimonial:
        "The acupuncture sessions have helped me manage my pain better than ever before.",
      name: "Jane Doe",
      work: "Wellness Coach",
    },
    {
      profileImg: "/profile1.png",
      testimonial:
        "Whether it’s ayurveda or astrology, naturopathy or Acupuncture - if you’re a holistic specialist devoted to your practice and looking to share your wisdom, grow your audience and get more bookings, we can help.",
      name: "John Smith",
      work: "Fitness Trainer",
    },
    {
      profileImg: "/profile1.png",
      testimonial:
        "I've seen amazing results with their naturopathic treatments.",
      name: "Emily Davis",
      work: "Nutritionist",
    },
  ]);
  return (
    <section className={"py-16 testimonials-slider space-y-16"}>
      <div className="max-w-3xl mx-auto w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Témoignages clients
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        // grabCursor={true}

        centeredSlides={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        speed={500}
        slidesPerView={"auto"}
        spaceBetween={100}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: -10,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
        className="container mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="pb-16"
            style={{ maxWidth: 500, width: "100%" }}
          >
            <TestimonialsCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

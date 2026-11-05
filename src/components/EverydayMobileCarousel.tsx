"use client";

import { useEffect, useRef } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { SitePhoto } from "@/components/SitePhoto";
import type { Photo } from "@/lib/media";
import "swiper/css";

type Category = {
  title: string;
  body: string;
};

type Props = {
  categories: readonly Category[];
  photos: Photo[];
  index: number;
  labelled: boolean;
  onIndex: (index: number) => void;
  onClose: () => void;
};

const arrowClass =
  "grid size-12 cursor-pointer place-items-center rounded-full border border-paper/80 bg-paper text-accent shadow-[0_0.5rem_1.5rem_rgb(34_48_38/0.18)]";

export function EverydayMobileCarousel({
  categories,
  photos,
  index,
  labelled,
  onIndex,
  onClose,
}: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || swiper.realIndex === index) return;
    swiper.slideTo(index);
  }, [index]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col sm:hidden">
      <Swiper
        modules={[A11y]}
        rewind
        speed={460}
        spaceBetween={16}
        initialSlide={index}
        watchOverflow
        className="h-full min-h-0 w-full flex-1 overflow-clip!"
        style={{ height: "100%", overflow: "clip" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.el.scrollTop = 0;
        }}
        onSlideChange={(swiper) => {
          swiper.el.scrollTop = 0;
          if (swiper.realIndex !== indexRef.current) onIndex(swiper.realIndex);
        }}
      >
        {categories.map((category, slide) => {
          const photo = photos[slide];
          return (
            <SwiperSlide key={category.title} inert={slide !== index}>
              <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-paper shadow-[0_1rem_2.4rem_rgb(34_48_38/0.16)]">
                <div className="relative min-h-24 flex-1 overflow-hidden">
                  <SitePhoto
                    photo={photo}
                    sizes="100vw"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-md border border-paper/70 bg-ink text-paper shadow-[0_0.4rem_1.2rem_rgb(34_48_38/0.25)]"
                  >
                    <span className="sr-only">Close {category.title}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
                      <path
                        d="M5 5l14 14M19 5 5 19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="min-h-0 shrink overflow-y-auto px-6 pt-5 pb-6">
                  <h3
                    id={
                      labelled && slide === index ? "everyday-dialog-title" : undefined
                    }
                    className="font-display text-4xl leading-[1.05] text-ink"
                  >
                    {category.title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-7 text-ink-soft">
                    {category.body}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mt-3 flex shrink-0 items-center justify-center gap-3">
        <button
          type="button"
          className={arrowClass}
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
              d="M14 6 8 12l6 6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <p className="min-w-16 text-center font-ui text-xs tracking-[0.08em] text-paper">
          {index + 1} / {categories.length}
        </p>
        <button
          type="button"
          className={arrowClass}
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
              d="m10 6 6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

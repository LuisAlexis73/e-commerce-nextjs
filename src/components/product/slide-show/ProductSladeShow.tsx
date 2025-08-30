'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSladeShow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#155dfc',
          '--swiper-pagination-color': '#fff',
          '--swiper-cursor': 'pointer',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage src={image} alt={title} width={1024} height={800} className="rounded-lg object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper cursor-pointer mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ProductImage src={image} alt={title} width={300} height={300} className="rounded-lg object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

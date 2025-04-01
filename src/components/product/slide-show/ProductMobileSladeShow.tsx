'use client';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSladeShow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
        style={{ height: '500px', width: '100vw' }}
        autoplay={
          { delay: 2500 }
        }
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={`/products/${image}`} alt={title} width={600} height={500} className="object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

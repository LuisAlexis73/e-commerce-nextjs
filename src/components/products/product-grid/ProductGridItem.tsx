'use client';
import { Product } from "@/interfaces/product.interface";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
  isPriority?: boolean; // Optional prop to set priority for the image if is necessary
}

export const ProductGridItem = ({ product, isPriority = false }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          priority={isPriority} // Set priority for the first image to load faster if is necessary
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-800" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
      </div>
    </div>
  )
}

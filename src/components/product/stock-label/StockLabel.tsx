/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, [])

  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setLoading(false);
  }

  return (
    <div>
      {
        loading ? <h1 className={`${titleFont.className} antialiased font-bold bg-white animate-pulse`}>
          <h1 className='bg-white animate-pulse'>
            &nbsp;
          </h1>
        </h1> :
          <h1 className={`${titleFont.className} antialiased font-bold`}>
            Stock: {stock} {stock > 0 ? "Available" : "Out of stock"}
          </h1>
      }
    </div>
  )
}

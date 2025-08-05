'use client'
import { useCartStore } from "@/store/cart/cart-store"
import { currencyFormatter } from "@/utils/currency-formatter";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCartCheckout = () => {

  const productsInCart = useCartStore(state => state.cart)

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div className="flex mb-3" key={`${product.slug}-${product.size}`}>

            <Image
              src={`/products/${product.image}`}
              alt={`${product.title}`}
              width={100} height={100}
              className="mr-5 rounded"
              style={{ width: '100px', height: '100px' }}
            />

            <div>
              <span>
                {product.size} - {product.title} ({product.quantity} items)
              </span>

              <p className="font-bold">{currencyFormatter(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}

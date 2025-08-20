'use client'
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { CartProduct } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const router = useRouter();

  const productsInCart = useCartStore(state => state.cart)
  const updateProductsInCart = useCartStore(state => state.updateProductQuantity);
  const removeProduct = useCartStore(state => state.removeProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleRemove = (product: CartProduct) => {
    const isLastItem = productsInCart.length === 1;
    removeProduct(product);

    if (isLastItem) {
      router.replace('/empty');
    }
  }

  if (!loaded) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div className="flex mb-3" key={`${product.slug}-${product.size}`}>

            <ProductImage
              src={product.image}
              alt={product.title}
              width={100} height={100}
              className="mr-5 rounded"
              style={{ width: '100px', height: '100px' }}
            />

            <div>
              <Link
                href={`/product/${product.slug}`}
                className="underline text-blue-500 hover:text-blue-800">
                {product.size} - {product.title}
              </Link>

              <p>${product.price}</p>

              <QuantitySelector quantity={product.quantity} onSelectedQuantity={value => updateProductsInCart(product, value)} />

              <button
                onClick={() => handleRemove(product)}
                className="underline mt-3 cursor-pointer hover:text-red-500">
                Remove
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}

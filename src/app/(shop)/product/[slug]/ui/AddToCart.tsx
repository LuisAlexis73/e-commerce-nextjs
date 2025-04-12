'use client'
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { SizeSelector } from "@/components/product/size-selector/SizeSelector"
import { CartProduct, Product, Size } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart-store"
import { useState } from "react"

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    if (!size) {
      alert('Please select a size')
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      price: product.price,
      size: size,
      image: product.images[0],
      quantity: quantity,
      title: product.title,
      slug: product.slug,
    }

    addProductToCart(cartProduct)
    setQuantity(1) // Reset quantity to 1 after adding to cart
    setSize(undefined) // Reset size after adding to cart
  }

  return (
    <>
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSelectSize={setSize} />

      <QuantitySelector quantity={quantity} onSelectedQuantity={setQuantity} />

      <button className="btn-primary my-5 cursor-pointer" onClick={addToCart}>
        Add to cart
      </button>
    </>
  )
}

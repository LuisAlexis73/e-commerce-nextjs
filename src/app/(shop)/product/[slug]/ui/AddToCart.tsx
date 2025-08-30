'use client'
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { SizeSelector } from "@/components/product/size-selector/SizeSelector"
import { CartProduct, Product, Size } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart-store"
import { useState } from "react"
import Toastify from 'toastify-js'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState(false);

  const addToCart = () => {
    if (!size) {
      setError(true);
      return;
    }

    setError(false);

    Toastify({
      text: "Product added to cart",
      duration: 3000,
      gravity: "bottom",
      style: {
        background: "linear-gradient(to left, #193cb8, #155dfc)",
        width: "200px",
        color: "#fff",
        position: "absolute",
        right: "20px",
        borderRadius: "5px",
        padding: "8px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }
    }).showToast();

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
      {error && <span className="text-red-500 font-semibold ml-5">Please select a size</span>}
    </>
  )
}

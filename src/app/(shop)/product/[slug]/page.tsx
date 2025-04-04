import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { SizeSelector } from "@/components/product/size-selector/SizeSelector"
import { ProductMobileSladeShow } from "@/components/product/slide-show/ProductMobileSladeShow"
import { ProductSladeShow } from "@/components/product/slide-show/ProductSladeShow"
import { titleFont } from "@/config/fonts"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params
  const product = initialData.products.find(product => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-20 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile SlideShow */}
        <ProductMobileSladeShow images={product.images} title={product.title} className="block md:hidden" />

        {/* Desktop SlideShow */}
        <ProductSladeShow images={product.images} title={product.title} className="hidden md:block" />
      </div>

      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">
          {product.price}
        </p>

        <SizeSelector selectedSize={product.sizes[1]} availableSizes={product.sizes} />

        <QuantitySelector quantity={0} />

        <button className="btn-primary my-5">
          Add to cart
        </button>

        <h3 className="font-bold text-sm">Description</h3>

        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  )
}
import { getProductBySlug } from "@/actions/products/get-product-by-slug"
import { ProductMobileSladeShow } from "@/components/product/slide-show/ProductMobileSladeShow"
import { ProductSladeShow } from "@/components/product/slide-show/ProductSladeShow"
import { StockLabel } from "@/components/product/stock-label/StockLabel"
import { titleFont } from "@/config/fonts"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { AddToCart } from "./ui/AddToCart"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedSearchParams = await params;

  // read route params
  const slug = await resolvedSearchParams.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedSearchParams = await params;

  const slug = await resolvedSearchParams.slug;
  const product = await getProductBySlug(slug);

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

        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">
          {product.price}
        </p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Description</h3>

        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  )
}
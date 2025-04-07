// import { notFound } from "next/navigation"

import { ProductGrid } from "@/components/products/product-grid/ProductGrid"
import { Title } from "@/components/title/Title"
import { Category } from "@/interfaces/product.interface"
import { initialData } from "@/seed/seed"

const seedProducts = initialData.products

interface Props {
  params: {
    id: Category;
  }
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex',
  }

  // if (id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title title={`Items for ${(labels as any)[id]}`} subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  )
}
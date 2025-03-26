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
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Todos',
  }

  // if (id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title title={`Artículos para ${(labels as any)[id]}`} subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
    </>
  )
}
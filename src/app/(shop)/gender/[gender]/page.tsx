// import { notFound } from "next/navigation"

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination"
import { ProductGrid } from "@/components/products/product-grid/ProductGrid"
import { Title } from "@/components/title/Title"
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>,
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const { gender } = await params;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'For men',
    'women': 'For women',
    'kid': 'For kids',
    'unisex': 'For everyone',
  }

  return (
    <>
      <Title title={`Items for ${labels[gender]}`} subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
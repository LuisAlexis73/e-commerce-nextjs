import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/title/Title";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}

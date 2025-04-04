import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={products} />
    </>
  );
}

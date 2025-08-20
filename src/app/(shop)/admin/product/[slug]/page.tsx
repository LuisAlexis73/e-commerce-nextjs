import { Title } from "@/components/title/Title";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { getCategories } from "@/actions/category/get-categories";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = (slug === "new") ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}

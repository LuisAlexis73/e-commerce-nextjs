/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { createUpdateProduct } from "@/actions/products/create-update-product";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Category } from "@/interfaces/category.interface";
import { Product } from "@/interfaces/product.interface";
import { ProductImage as ProductWithImage } from "@/interfaces/product.interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { productImage?: ProductWithImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  // images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    // formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      // images: undefined,
    },
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    // const { images, ...productToSave } = data;
    const { ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price?.toString());
    formData.append("inStock", productToSave.inStock?.toString());
    formData.append("sizes", productToSave.sizes?.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    // if (images) {
    //   for (let i = 0; i < images.length; i++) {
    //     formData.append("images", images[i]);
    //   }
    // }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Product can not be updated");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-100"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-100"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-100"
            {...register("gender", { required: true })}
          >
            <option value="">[Chose]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-100"
            {...register("categoryId", { required: true })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full cursor-pointer">Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventory</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-100"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                  {
                    "bg-blue-500 text-white":
                      getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Pictures</span>
            <input
              type="file"
              multiple
              // {...register('images')}
              className="p-2 border rounded-md bg-gray-100 cursor-pointer"
              accept="image/png, image/jpeg, image/webp, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.productImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ""}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  onClick={() => console.log(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

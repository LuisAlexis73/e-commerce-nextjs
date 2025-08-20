import { getOrderById } from "@/actions/order/get-order-by-id";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import { Title } from "@/components/title/Title";
import { currencyFormatter } from "@/utils/currency-formatter";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title
          title={`Order #${id.split("-").at(-1)}`}
          subtitle="order number"
          className="text-center mb-10"
        />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.productImage[0].url}`}
                  alt={`${item.product.title}`}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{ width: "100px", height: "100px" }}
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormatter(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Resume */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
            <div className="mb-10">
              <p className="text-2xl">Alexis Galarza</p>
              <p>
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Resume</h2>

            <div className="grid grid-cols-2">
              <span>N° Products</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 Item"
                  : `${order?.itemsInOrder} Items`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormatter(order!.subTotal)}
              </span>

              <span>Taxes (15%)</span>
              <span className="text-right">
                {currencyFormatter(order!.tax)}
              </span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormatter(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  By placing this order, you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  . You also confirm that you have read our{" "}
                  <Link href="/shipping" className="underline">
                    Shipping Policy
                  </Link>
                  .
                </span>
              </p>

              {/* PayPal Button */}
              {order!.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

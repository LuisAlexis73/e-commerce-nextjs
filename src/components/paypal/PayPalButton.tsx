'use client';

import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from "@paypal/react-paypal-js"

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100)) / 100;

  if (isPending) {
    return (
      <div className="animate-plus">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded mt-2" />
      </div>
    )
  }

  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (data, actions) => {
    try {
      const transactionId = await actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${roundedAmount}`,
            }
          }
        ],
        intent: "CAPTURE",
      })

      const { ok } = await setTransactionId(orderId, transactionId);

      if (!ok) {
        throw new Error('The order could not be updated.')
      }

      return transactionId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    console.log('onApprove');
    const details = await data.orderID;

    if (!details) return;

    await paypalCheckPayment(details);
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
    />
  )
}

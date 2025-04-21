import { Title } from '@/components/title/Title';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/actions/country/get-countries';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions/address/get-user-address';

export default async function AddressPage() {

  const countries = await getCountries()

  const session = await auth()

  if (!session?.user) {
    return (
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
        <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
          <Title title="Address" subtitle="Delivery address" />

          <p className='text-red-500'>Please login to see your address</p>
        </div>
      </div>
    )
  }

  const userAddress = await getUserAddress(session.user.id) ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
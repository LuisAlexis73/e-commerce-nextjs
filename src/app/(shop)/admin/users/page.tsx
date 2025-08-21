export const revalidate = 0;

import { Title } from "@/components/title/Title";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/user/get-paginated-users";
import { Pagination } from "@/components/ui/pagination/Pagination";

export default async function OrdersPage() {
  const { ok, users = [], totalPages } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All users" subtitle="Admin" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={totalPages!} />
      </div>
    </>
  );
}

import { auth } from "@/auth.config";
import { Title } from "@/components/title/Title";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Profile" />

      <div className="bg-gray-50 py-12 px-4 rounded-xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Encabezado con imagen */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center">
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={session.user.image || "/products/1700280-00-A_1.jpg"}
                alt={`Foto de ${session.user.name}`}
                className="rounded-full object-cover border-4 border-white shadow-lg"
                fill
                sizes="128px"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {session.user.name}
            </h1>
            <p className="text-gray-600">
              Role:{" "}
              {session.user.role === "user"
                ? "Customer"
                : session.user.role === "admin"
                ? "Administrator"
                : "Guest"}
            </p>
          </div>

          {/* Información del usuario */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email:
                </label>
                <p className="mt-1 text-gray-900">{session.user.email}</p>
              </div>

              {/* ID de usuario */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-500">
                  ID:
                </label>
                <p className="mt-1 text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded">
                  {session.user.id}
                </p>
              </div> */}

              {/* Dirección */}
              {/* {session.user.address && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Dirección
                  </label>
                  <p className="mt-1 text-gray-900">{session.user.address}</p>
                </div>
              )} */}

              {/* Fecha de registro */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-500">
                  Miembro desde
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(session.user.createdAt).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div> */}

              {/* Último acceso */}
              {/* {session.user.lastLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Último acceso
                  </label>
                  <p className="mt-1 text-gray-900">
                    {new Date(session.user.lastLogin).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )} */}
            </div>

            {/* Nota adicional para clientes */}
            {session.user.role === "user" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-bold text-center">
                  ✨ Thank you for being part of our community! Your recent and
                  reviews are available in your order history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

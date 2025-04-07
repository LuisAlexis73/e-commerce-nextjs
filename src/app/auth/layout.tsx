export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-flex">
      <div className="w-full sm:w-[350px] px-10 mx-auto">
        {children}
      </div>
    </main>
  );

}
import TopBar from "@/components/sentinel/TopBar";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-[1440px] px-8 pb-12 pt-8">
        {children}
      </main>
    </>
  );
}

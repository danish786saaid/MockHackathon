import TopBar from "@/components/sentinel/TopBar";
import LeftSidebar from "@/components/sentinel/LeftSidebar";
import RightPanel from "@/components/sentinel/RightPanel";

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <LeftSidebar />
      <RightPanel />
      {children}
    </>
  );
}

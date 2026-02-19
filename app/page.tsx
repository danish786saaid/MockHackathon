import TopBar from "@/components/sentinel/TopBar";
import LeftSidebar from "@/components/sentinel/LeftSidebar";
import RightPanel from "@/components/sentinel/RightPanel";
import BentoMain from "@/components/sentinel/BentoMain";

export default function Home() {
  return (
    <>
      <TopBar />
      <LeftSidebar />
      <RightPanel />
      <BentoMain />
    </>
  );
}

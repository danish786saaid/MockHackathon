import TopBar from "@/components/sentinel/TopBar";
import LeftSidebar from "@/components/sentinel/LeftSidebar";
import RightPanel from "@/components/sentinel/RightPanel";
import PortfolioMain from "@/components/portfolio/PortfolioMain";

export default function PortfolioPage() {
  return (
    <>
      <TopBar />
      <LeftSidebar />
      <RightPanel />
      <PortfolioMain />
    </>
  );
}

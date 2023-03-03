import { Footer } from "./Footer";
import { MainContent } from "./MainContent";
import { Navbar } from "./Navbar";

export interface IMainLayoutProps {}

export function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen flex-col px-4 pt-14 sm:px-6 sm:py-8">
        <MainContent />
        <Footer />
      </div>
    </>
  );
}

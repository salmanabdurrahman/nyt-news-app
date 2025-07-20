import PageHeader from "@/components/features/PageHeader";
import ArticleSearchContainer from "@/components/features/ArticleSearchContainer";
import ThemeToggleButton from "@/components/features/ThemeToggleButton";

const HomePage = () => {
  return (
    <main className="container mx-auto min-h-screen px-4 py-6 md:px-10 md:py-10 lg:py-16">
      <ThemeToggleButton />
      <PageHeader />
      <ArticleSearchContainer />
    </main>
  );
};

export default HomePage;

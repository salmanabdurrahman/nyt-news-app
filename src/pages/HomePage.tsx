import PageHeader from "@/components/features/PageHeader";
import ArticleSearchContainer from "@/components/features/ArticleSearchContainer";

const HomePage = () => {
  return (
    <main className="container mx-auto min-h-screen px-4 py-6 md:px-10 md:py-10 lg:py-14">
      <PageHeader />
      <ArticleSearchContainer />
    </main>
  );
};

export default HomePage;

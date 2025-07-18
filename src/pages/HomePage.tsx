import PageHeader from "@/components/features/PageHeader";
import ArticleSearchContainer from "@/components/features/ArticleSearchContainer";

const HomePage = () => {
  return (
    <main className="container mx-auto min-h-screen p-4 md:p-10">
      <PageHeader />
      <ArticleSearchContainer />
    </main>
  );
};

export default HomePage;

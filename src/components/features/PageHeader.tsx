const PageHeader = () => {
  return (
    <header className="mb-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
        Pencarian Artikel
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        Gunakan mesin pencari di bawah ini untuk menjelajahi artikel dari The New York Times.
      </p>
    </header>
  );
};

export default PageHeader;

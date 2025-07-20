import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-9xl font-black text-slate-300 dark:text-slate-700">404</h1>
      <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
        Halaman Tidak Ditemukan
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <Button asChild className="mt-4">
        <Link to="/">Kembali ke Halaman Utama</Link>
      </Button>
    </section>
  );
};

export default NotFoundPage;

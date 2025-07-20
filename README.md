# Aplikasi Pencarian Artikel The New York Times

Aplikasi web modern untuk mencari dan menjelajahi artikel dari The New York Times API, dibangun dengan React & TypeScript.

**[🚀 Lihat Demo Langsung](https://nyt-news-app-mu.vercel.app)**

## ✨ Fitur

- **Pencarian Artikel:** Cari artikel berdasarkan kata kunci.
- **Opsi Pengurutan:** Urutkan hasil berdasarkan relevansi, terbaru, atau terlama.
- **Infinite Scroll:** Muat artikel baru secara otomatis saat scroll.
- **Dark/Light Mode:** Ganti tema aplikasi dengan pilihan yang tersimpan.
- **Desain Responsif:** Tampilan optimal di semua perangkat.

## 🛠️ Tech Stack

- **Framework:** React, Vite
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Data Fetching:** Axios
- **Testing:** Vitest, React Testing Library

## 🛠️ Instalasi & Menjalankan

1.  **Clone repository ini:**

    ```bash
    git clone https://github.com/salmanabdurrahman/nyt-news-app.git
    cd nyt-news-app
    ```

2.  **Setup Environment Variables:**
    - Salin `.env.example` menjadi `.env`.
      ```bash
      cp .env.example .env
      ```
    - Buka `.env` dan isi variabelnya:
      - `VITE_NYT_API_KEY`: Kunci API rahasia dari [NYT Developer Portal](https://developer.nytimes.com/).
      - `VITE_NYT_API_BASE_URL`: Alamat dasar API, contoh: `https://api.nytimes.com/svc/search/v2`.

3.  **Install dependensi:**

    ```bash
    npm install
    ```

4.  **Jalankan server development:**

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.

## 🧪 Testing

Untuk menjalankan pengujian, gunakan perintah berikut:

```bash
npm run test
```

Pengujian akan dijalankan menggunakan Vitest dan React Testing Library.

## 📦 Build untuk Production

Untuk membangun aplikasi untuk produksi, gunakan perintah berikut:

```bash
npm run build
```

Hasil build akan disimpan di direktori `dist`.

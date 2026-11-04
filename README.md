# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ADMIN-13361

Aplikasi UTS Pemrograman Sisi Klien berbasis React, Vite, Tailwind CSS, dan React Router.

## Menjalankan aplikasi

1. Buka folder proyek ini di VS Code.
2. Jalankan `npm install` jika dependencies belum terpasang.
3. Jalankan `npm run dev`.

## Akun login UTS

- Email: `13361@mail.com`
- Password: `13361`

## Catatan sebelum pengumpulan

- Ganti teks `Nama Sendiri` pada data dosen pertama di `src/Data/Dummy.jsx` dengan nama lengkap mahasiswa.
- Data dosen disimpan pada `localStorage` dengan key `dosen`.
- Untuk mengulang data awal saat pengujian, hapus key `dosen` dari Local Storage browser.

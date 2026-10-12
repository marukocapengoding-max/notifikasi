# 🌸 Pusat Notifikasi Multi-Saluran

Aplikasi demo untuk mengirim notifikasi lewat **Email**, **WhatsApp**, dan **SMS**.
Setiap saluran punya cara kirim sendiri, tetapi semuanya memiliki method `kirim()`.

## ✨ Konsep

- `Notifikasi` : kelas abstrak dengan method `kirim()`
- `EmailNotifikasi`, `WhatsAppNotifikasi`, `SMSNotifikasi` : turunan yang meng-override `kirim()`
- Polimorfisme: semua saluran dipanggil dengan cara yang sama, `notif.kirim()`

## 🚀 Cara pakai

1. Upload `index.html`, `style.css`, `script.js` ke repository GitHub
2. Aktifkan **Settings → Pages → Deploy from branch → main**
3. Buka link GitHub Pages kamu 💖

> Pengiriman di sini disimulasikan. Untuk produksi, ganti isi `kirim()` dengan API asli
> (mis. SMTP, WhatsApp Business API, atau gateway SMS).

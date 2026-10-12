// ============================================
// Sistem Notifikasi Multi-Saluran
// Semua saluran mewarisi kelas Notifikasi dan wajib punya kirim()
// ============================================

class Notifikasi {
  constructor(penerima, pesan) {
    if (new.target === Notifikasi) {
      throw new Error("Notifikasi adalah kelas abstrak, tidak bisa dibuat langsung.");
    }
    this.penerima = penerima;
    this.pesan = pesan;
  }

  // Wajib di-override oleh setiap saluran
  kirim() {
    throw new Error("Method kirim() harus diimplementasikan oleh subclass.");
  }
}

class EmailNotifikasi extends Notifikasi {
  kirim() {
    if (!this.penerima.includes("@")) {
      throw new Error("Alamat email tidak valid.");
    }
    return `📧 Email terkirim ke ${this.penerima}: "${this.pesan}"`;
  }
}

class WhatsAppNotifikasi extends Notifikasi {
  kirim() {
    if (!/^\+?\d{9,15}$/.test(this.penerima)) {
      throw new Error("Nomor WhatsApp tidak valid.");
    }
    return `💬 WhatsApp terkirim ke ${this.penerima}: "${this.pesan}"`;
  }
}

class SMSNotifikasi extends Notifikasi {
  kirim() {
    if (!/^\+?\d{9,15}$/.test(this.penerima)) {
      throw new Error("Nomor SMS tidak valid.");
    }
    const ringkas = this.pesan.length > 160 ? this.pesan.slice(0, 157) + "..." : this.pesan;
    return `📱 SMS terkirim ke ${this.penerima}: "${ringkas}"`;
  }
}

// ---------- Antarmuka ----------
const saluran = {
  email: EmailNotifikasi,
  whatsapp: WhatsAppNotifikasi,
  sms: SMSNotifikasi,
};

const form = document.getElementById("form-notif");
const log = document.getElementById("log");

function tambahLog(teks, error = false) {
  const li = document.createElement("li");
  li.textContent = teks;
  if (error) li.classList.add("error");
  log.prepend(li);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pesan = document.getElementById("pesan").value.trim();
  const dipilih = [...form.querySelectorAll("input[name=saluran]:checked")];

  if (!pesan || dipilih.length === 0) {
    tambahLog("⚠️ Isi pesan dan pilih minimal satu saluran ya.", true);
    return;
  }

  dipilih.forEach((cb) => {
    const jenis = cb.value;
    const tujuan = document.getElementById(`tujuan-${jenis}`).value.trim();
    try {
      const notif = new saluran[jenis](tujuan, pesan);
      tambahLog(notif.kirim()); // polimorfisme: semua dipanggil dengan kirim()
    } catch (err) {
      tambahLog(`❌ ${jenis.toUpperCase()}: ${err.message}`, true);
    }
  });
});

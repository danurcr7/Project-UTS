// Data karyawan sebagai array contoh (bisa diganti dengan data dari server atau database)
let dataKaryawan = [
    { "id": 1, "kode": "Z001", "nama": "Udin", "email": "udin@gmail.com", "alamat": "Jl. Merdeka No.1", "jabatan": "Engineer" },
    { "id": 2, "kode": "Z002", "nama": "Cici", "email": "cici@gmail.com", "alamat": "Jl. Sudirman No.10", "jabatan": "HR" },
    { "id": 3, "kode": "Z003", "nama": "Eka", "email": "eka@gmail.com", "alamat": "Jl. Asia Afrika No.3", "jabatan": "Marketing" },
    { "id": 4, "kode": "Z004", "nama": "Fani", "email": "fani@gmail.com", "alamat": "Jl. Braga No.2", "jabatan": "Finance" },
    { "id": 5, "kode": "Z005", "nama": "Gita", "email": "gita@gmail.com", "alamat": "Jl. Riau No.7", "jabatan": "Manager" }
];

// Fungsi untuk render data karyawan ke tabel
function renderTabelKaryawan() {
    const tabelBody = document.querySelector("#tabelKaryawan tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataKaryawan.forEach((karyawan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${karyawan.kode}</td>
            <td>${karyawan.nama}</td>
            <td>${karyawan.email}</td>
            <td>${karyawan.alamat}</td>
            <td>${karyawan.jabatan}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editKaryawan(${karyawan.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusKaryawan(${karyawan.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah karyawan
function tambahKaryawan() {
    // Ambil nilai dari form
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const alamat = document.getElementById("alamat").value;

    // Validasi sederhana
    if (!kode || !nama || !email || !alamat) {
        alert("Semua kolom harus diisi!");
        return;
    }

    // Buat objek karyawan baru
    const karyawanBaru = {
        id: dataKaryawan.length + 1,
        kode: kode,
        nama: nama,
        email: email,
        alamat: alamat
    };

    // Tambahkan ke dataKaryawan dan render ulang tabel
    dataKaryawan.push(karyawanBaru);
    renderTabelKaryawan();

    // Reset form dan tutup modal
    document.getElementById("formKaryawan").reset();
    $("#tambahKaryawanModal").modal("hide");
}

// Fungsi edit karyawan
function editKaryawan(id) {
    // Cari data karyawan berdasarkan ID
    const karyawan = dataKaryawan.find(k => k.id === id);

    // Jika data ditemukan, isi form dengan data karyawan
    if (karyawan) {
        document.getElementById("kode_karyawan").value = karyawan.kode;
        document.getElementById("nama").value = karyawan.nama;
        document.getElementById("email").value = karyawan.email;
        document.getElementById("alamat").value = karyawan.alamat;

        // Tampilkan modal dan ubah tombol untuk menyimpan perubahan
        $("#tambahKaryawanModal").modal("show");
        document.getElementById("simpanKaryawan").onclick = function () {
            simpanPerubahanKaryawan(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan karyawan
function simpanPerubahanKaryawan(id) {
    // Cari data karyawan berdasarkan ID
    const karyawan = dataKaryawan.find(k => k.id === id);

    // Update data karyawan
    if (karyawan) {
        karyawan.kode = document.getElementById("kode_karyawan").value;
        karyawan.nama = document.getElementById("nama").value;
        karyawan.email = document.getElementById("email").value;
        karyawan.alamat = document.getElementById("alamat").value;

        // Render ulang tabel dan tutup modal
        renderTabelKaryawan();
        document.getElementById("formKaryawan").reset();
        $("#tambahKaryawanModal").modal("hide");

        // Kembalikan fungsi tombol tambah karyawan ke fungsi tambahKaryawan
        document.getElementById("simpanKaryawan").onclick = tambahKaryawan;
    }
}

// Fungsi hapus karyawan
function hapusKaryawan(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data karyawan ini?")) {
        // Hapus karyawan dari array
        dataKaryawan = dataKaryawan.filter(k => k.id !== id);

        // Render ulang tabel
        renderTabelKaryawan();
    }
}

// Inisialisasi tabel karyawan saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelKaryawan);

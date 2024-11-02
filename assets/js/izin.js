// Data izin sebagai array contoh
let dataIzin = [
    { "id": 1, "kode": "V001", "nama": "Isabella Frost", "tanggal": "2024-11-06", "alasan": "Acara Pernikahan", "status": "Menunggu" },
    { "id": 2, "kode": "V002", "nama": "Elijah Storm", "tanggal": "2024-11-07", "alasan": "Istirahat Kesehatan", "status": "Disetujui" },
    { "id": 3, "kode": "V003", "nama": "Vivian Knight", "tanggal": "2024-11-08", "alasan": "Sakit", "status": "Menunggu" },
    { "id": 4, "kode": "V004", "nama": "Aurora Quinn", "tanggal": "2024-11-10", "alasan": "Liburan", "status": "Ditolak" },
    { "id": 5, "kode": "V005", "nama": "Scarlett Vaughn", "tanggal": "2024-11-09", "alasan": "Perjalanan Dinas", "status": "Disetujui" }
];

// Fungsi untuk render data izin ke tabel
function renderTabelIzin() {
    const tabelBody = document.querySelector("#tabelIzin tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataIzin.forEach((izin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${izin.kode}</td>
            <td>${izin.nama}</td>
            <td>${izin.tanggal}</td>
            <td>${izin.alasan}</td>
            <td>${izin.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editIzin(${izin.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusIzin(${izin.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah izin
function tambahIzin() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal_izin").value;
    const alasan = document.getElementById("alasan").value;
    const status = document.getElementById("status").value;

    if (!kode || !nama || !tanggal || !alasan || !status) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const izinBaru = {
        id: dataIzin.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        alasan: alasan,
        status: status
    };

    dataIzin.push(izinBaru);
    renderTabelIzin();

    document.getElementById("formIzin").reset();
    $("#tambahIzinModal").modal("hide");
}

// Fungsi edit izin
function editIzin(id) {
    const izin = dataIzin.find(i => i.id === id);

    if (izin) {
        document.getElementById("kode_karyawan").value = izin.kode;
        document.getElementById("nama").value = izin.nama;
        document.getElementById("tanggal_izin").value = izin.tanggal;
        document.getElementById("alasan").value = izin.alasan;
        document.getElementById("status").value = izin.status;

        $("#tambahIzinModal").modal("show");
        document.getElementById("simpanIzin").onclick = function () {
            simpanPerubahanIzin(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan izin
function simpanPerubahanIzin(id) {
    const izin = dataIzin.find(i => i.id === id);

    if (izin) {
        izin.kode = document.getElementById("kode_karyawan").value;
        izin.nama = document.getElementById("nama").value;
        izin.tanggal = document.getElementById("tanggal_izin").value;
        izin.alasan = document.getElementById("alasan").value;
        izin.status = document.getElementById("status").value;

        renderTabelIzin();
        document.getElementById("formIzin").reset();
        $("#tambahIzinModal").modal("hide");

        document.getElementById("simpanIzin").onclick = tambahIzin;
    }
}

// Fungsi hapus izin
function hapusIzin(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data izin ini?")) {
        dataIzin = dataIzin.filter(i => i.id !== id);
        renderTabelIzin();
    }
}

// Inisialisasi tabel izin saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelIzin);
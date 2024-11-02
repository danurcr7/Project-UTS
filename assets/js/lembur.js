// Data lembur sebagai array contoh
let dataLembur = [
    { "id": 1, "kode": "U001", "nama": "Damien Blackwood", "tanggal": "2024-11-27", "jamMulai": "17:00", "jamSelesai": "21:00", "totalJam": "4 Jam" },
    { "id": 2, "kode": "U002", "nama": "Luna Sterling", "tanggal": "2024-11-30", "jamMulai": "18:00", "jamSelesai": "23:00", "totalJam": "5 Jam" },
    { "id": 3, "kode": "U003", "nama": "Theo Valerian", "tanggal": "2024-11-15", "jamMulai": "16:30", "jamSelesai": "22:30", "totalJam": "6 Jam" },
    { "id": 4, "kode": "U004", "nama": "Selena Storm", "tanggal": "2024-11-10", "jamMulai": "17:15", "jamSelesai": "20:15", "totalJam": "3 Jam" },
    { "id": 5, "kode": "U005", "nama": "Orion Blaze", "tanggal": "2024-11-24", "jamMulai": "18:00", "jamSelesai": "20:00", "totalJam": "2 Jam" }
];

// Fungsi untuk render data lembur ke tabel
function renderTabelLembur() {
    const tabelBody = document.querySelector("#tabelLembur tbody");
    tabelBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    dataLembur.forEach((lembur, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${lembur.kode}</td>
            <td>${lembur.nama}</td>
            <td>${lembur.tanggal}</td>
            <td>${lembur.jamMulai}</td>
            <td>${lembur.jamSelesai}</td>
            <td>${lembur.totalJam}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editLembur(${lembur.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusLembur(${lembur.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabelBody.appendChild(row);
    });
}

// Fungsi tambah lembur
function tambahLembur() {
    const kode = document.getElementById("kode_karyawan").value;
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const jamMulai = document.getElementById("jam_mulai").value;
    const jamSelesai = document.getElementById("jam_selesai").value;

    if (!kode || !nama || !tanggal || !jamMulai || !jamSelesai) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const lemburBaru = {
        id: dataLembur.length + 1,
        kode: kode,
        nama: nama,
        tanggal: tanggal,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
        totalJam: `${(new Date(`1970-01-01T${jamSelesai}:00`) - new Date(`1970-01-01T${jamMulai}:00`)) / 3600000} Jam`
    };

    dataLembur.push(lemburBaru);
    renderTabelLembur();

    document.getElementById("formLembur").reset();
    $("#tambahLemburModal").modal("hide");
}

// Fungsi edit lembur
function editLembur(id) {
    const lembur = dataLembur.find(l => l.id === id);

    if (lembur) {
        document.getElementById("kode_karyawan").value = lembur.kode;
        document.getElementById("nama").value = lembur.nama;
        document.getElementById("tanggal").value = lembur.tanggal;
        document.getElementById("jam_mulai").value = lembur.jamMulai;
        document.getElementById("jam_selesai").value = lembur.jamSelesai;

        $("#tambahLemburModal").modal("show");
        document.getElementById("simpanLembur").onclick = function () {
            simpanPerubahanLembur(id);
        };
    }
}

// Fungsi untuk menyimpan perubahan lembur
function simpanPerubahanLembur(id) {
    const lembur = dataLembur.find(l => l.id === id);

    if (lembur) {
        lembur.kode = document.getElementById("kode_karyawan").value;
        lembur.nama = document.getElementById("nama").value;
        lembur.tanggal = document.getElementById("tanggal").value;
        lembur.jamMulai = document.getElementById("jam_mulai").value;
        lembur.jamSelesai = document.getElementById("jam_selesai").value;
        lembur.totalJam = `${(new Date(`1970-01-01T${lembur.jamSelesai}:00`) - new Date(`1970-01-01T${lembur.jamMulai}:00`)) / 3600000} Jam`;

        renderTabelLembur();
        document.getElementById("formLembur").reset();
        $("#tambahLemburModal").modal("hide");
    }
}

// Fungsi hapus lembur
function hapusLembur(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data lembur ini?")) {
        dataLembur = dataLembur.filter(l => l.id !== id);
        renderTabelLembur();
    }
}

// Inisialisasi tabel lembur saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTabelLembur);

/* 
==============================================================================
FILE: ve.js
TÁC VỤ CHÍNH:
  • Quản lý bảng giá vé theo các loại (người lớn, trẻ em, người cao tuổi)
  • Quản lý danh sách các mã giảm giá khả dụng
  • Tính toán tổng tiền vé dựa trên loại vé, số lượng, và mã giảm giá
  • Áp dụng và xóa mã giảm giá
  • Xử lý form đặt vé
  • Lưu thông tin đặt vé vào localStorage
  • Kiểm tra trạng thái đăng nhập
  • Hiển thị thông báo lỗi và thành công
==============================================================================
*/

// Bảng giá vé
const bangGiaVe = {
    "Người lớn (1.000.000 VNĐ)": 1000000,
    "Trẻ em (500.000 VNĐ)": 500000,
    "Người cao tuổi (700.000 VNĐ)": 700000
};

// Danh sách mã giảm giá
const danhSachMaGiamGia = {
    "SUMMER2024": { phanTram: 10, moTa: "Giảm 10% - Mã khuyến mãi hè" },
    "FAMILY20": { phanTram: 20, moTa: "Giảm 20% - Gia đình từ 4 người" },
    "STUDENT15": { phanTram: 15, moTa: "Giảm 15% - Học sinh, sinh viên" },
    "SENIOR10": { phanTram: 10, moTa: "Giảm 10% - Người cao tuổi" },
    "WELCOME5": { phanTram: 5, moTa: "Giảm 5% - Khách hàng mới" },
    "VIP25": { phanTram: 25, moTa: "Giảm 25% - Khách hàng VIP" }
};

// Biến lưu trữ mã giảm giá hiện tại
let maGiamGiaHienTai = null;
let phanTramGiamHienTai = 0;

// Tính tổng tiền
function tinhTongTien() {
    const loaiVe = document.getElementById("loai-ve-chon").value;
    const soNguoi = parseInt(document.getElementById("so-nguoi-chon").value) || 0;
    
    if (!loaiVe || soNguoi <= 0) {
        document.getElementById("tong-tien-container").style.display = "none";
        return;
    }
    
    const giaVe = bangGiaVe[loaiVe] || 0;
    const tongTien = giaVe * soNguoi;
    const tongTienTruocGiam = tongTien;
    
    // Tính tiền giảm giá
    const tienGiam = tongTien * (phanTramGiamHienTai / 100);
    const tongTienSauGiam = tongTien - tienGiam;
    
    // Hiển thị chi tiết giá
    document.getElementById("hien-thi-gia-ve").textContent = giaVe.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById("hien-thi-so-nguoi").textContent = soNguoi;
    document.getElementById("hien-thi-tong-truoc-giam").textContent = tongTienTruocGiam.toLocaleString('vi-VN') + " VNĐ";
    
    // Hiển thị giảm giá nếu có
    if (phanTramGiamHienTai > 0) {
        document.getElementById("hang-giam-gia").style.display = "flex";
        document.getElementById("hien-thi-phan-tram-giam").textContent = `Giảm giá (${phanTramGiamHienTai}%):`;
        document.getElementById("hien-thi-tien-giam").textContent = "-" + tienGiam.toLocaleString('vi-VN') + " VNĐ";
        document.getElementById("hien-thi-tong-tien").innerHTML = "<strong>" + tongTienSauGiam.toLocaleString('vi-VN') + " VNĐ</strong>";
    } else {
        document.getElementById("hang-giam-gia").style.display = "none";
        document.getElementById("hien-thi-tong-tien").innerHTML = "<strong>" + tongTien.toLocaleString('vi-VN') + " VNĐ</strong>";
    }
    
    document.getElementById("tong-tien-container").style.display = "block";
}

// Áp dụng mã giảm giá (chỉ khi đã đăng nhập)
function apDungMaGiamGia() {
    const thongBaoDiv = document.getElementById("thong-bao-ma-giam-gia");
    const nutXoaGiamGia = document.getElementById("nut-xoa-giam-gia");
    
    // Kiểm tra trạng thái đăng nhập
    const nguoiDung = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!nguoiDung) {
        thongBaoDiv.className = "thong-bao-ma-giam loi";
        thongBaoDiv.innerHTML = "⚠️ Vui lòng <a href='login.html' style='color: #dc3545; text-decoration: underline;'>đăng nhập</a> để sử dụng mã giảm giá";
        thongBaoDiv.style.display = "block";
        nutXoaGiamGia.style.display = "none";
        return;
    }
    
    const maGiamGia = document.getElementById("ma-giam-gia").value.trim().toUpperCase();
    
    if (!maGiamGia) {
        thongBaoDiv.className = "thong-bao-ma-giam loi";
        thongBaoDiv.textContent = "⚠️ Vui lòng nhập mã giảm giá";
        thongBaoDiv.style.display = "block";
        return;
    }
    
    if (danhSachMaGiamGia[maGiamGia]) {
        maGiamGiaHienTai = maGiamGia;
        phanTramGiamHienTai = danhSachMaGiamGia[maGiamGia].phanTram;
        
        thongBaoDiv.className = "thong-bao-ma-giam thanh-cong";
        thongBaoDiv.innerHTML = `✓ ${danhSachMaGiamGia[maGiamGia].moTa}`;
        thongBaoDiv.style.display = "block";
        
        nutXoaGiamGia.style.display = "inline-block";
        
        tinhTongTien();
    } else {
        maGiamGiaHienTai = null;
        phanTramGiamHienTai = 0;
        
        thongBaoDiv.className = "thong-bao-ma-giam loi";
        thongBaoDiv.textContent = "✗ Mã giảm giá không hợp lệ";
        thongBaoDiv.style.display = "block";
        
        nutXoaGiamGia.style.display = "none";
        
        tinhTongTien();
    }
}

// Xóa mã giảm giá
function xoaMaGiamGia() {
    maGiamGiaHienTai = null;
    phanTramGiamHienTai = 0;
    document.getElementById("ma-giam-gia").value = "";
    document.getElementById("thong-bao-ma-giam-gia").style.display = "none";
    document.getElementById("nut-xoa-giam-gia").style.display = "none";
    tinhTongTien();
}

// Kiểm tra trạng thái đăng nhập (hiển thị thông tin nếu có)
function kiemTraDangNhapVe() {
    const nguoiDung = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    const trangThaiXacThuc = document.getElementById("trang-thai-xac-thuc");

    if (nguoiDung) {
        trangThaiXacThuc.style.display = "block";
        document.getElementById("ten-nguoi-dung-ve").textContent = "Xin chào, " + nguoiDung.hoTen;
    } else {
        trangThaiXacThuc.style.display = "none";
    }
}

// Xử lý đăng xuất
const nutDangXuatVe = document.getElementById("nut-dang-xuat-ve");
if (nutDangXuatVe) {
    nutDangXuatVe.addEventListener("click", () => {
        localStorage.removeItem("nguoiDungDangNhap");
        window.location.href = "index.html";
    });
}

// Kiểm tra khi trang tải
kiemTraDangNhapVe();

// Prefill form nếu người dùng nhấp 'Đặt vé' từ trang chi tiết
try {
    const prefill = JSON.parse(sessionStorage.getItem('veDatTruoc'));
    if (prefill) {
        const selectDiaDiem = document.getElementById('dia-diem-chon');
        if (selectDiaDiem) selectDiaDiem.value = prefill.diaDiem || selectDiaDiem.value;

        const soNguoiEl = document.getElementById('so-nguoi-chon');
        if (soNguoiEl) soNguoiEl.value = prefill.soNguoi || soNguoiEl.value || 1;

        const loaiVeEl = document.getElementById('loai-ve-chon');
        if (loaiVeEl) loaiVeEl.value = prefill.loaiVe || loaiVeEl.value;

        // Tính lại giá khi có dữ liệu prefill
        if (typeof tinhTongTien === 'function') {
            tinhTongTien();
        }

        // Xoá prefill sau khi áp dụng
        sessionStorage.removeItem('veDatTruoc');
    }
} catch (e) {
    console.warn('Không thể đọc prefill:', e);
}

// Thêm sự kiện để tính tổng tiền khi thay đổi
document.getElementById("loai-ve-chon").addEventListener("change", tinhTongTien);
document.getElementById("so-nguoi-chon").addEventListener("input", tinhTongTien);

// Nút áp dụng mã giảm giá
const nutApDungGiamGia = document.getElementById("nut-ap-dung-giam-gia");
if (nutApDungGiamGia) {
    nutApDungGiamGia.addEventListener("click", (e) => {
        e.preventDefault();
        apDungMaGiamGia();
    });
}

// Nút quay lại trang chủ
const nutQuayLaiVe = document.getElementById("quay-ve-trang-chu");
if (nutQuayLaiVe) {
    nutQuayLaiVe.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Xử lý đặt vé
const bieuMauDatVe = document.getElementById("bieu-mau-dat-ve");
const thongBaoDiv = document.getElementById("thong-bao-ket-qua");

bieuMauDatVe.addEventListener("submit", (e) => {
    e.preventDefault();

    const diaDiem = document.getElementById("dia-diem-chon").value;
    const hoTen = document.getElementById("ho-ten-khach").value;
    const soDienThoai = document.getElementById("so-dien-thoai-khach").value;
    const email = document.getElementById("email-khach").value;
    const ngayKhoiHanh = document.getElementById("ngay-khoi-hanh-chon").value;
    const soNguoi = document.getElementById("so-nguoi-chon").value;
    const loaiVe = document.getElementById("loai-ve-chon").value;
    const ghiChu = document.getElementById("ghi-chu-them").value;

    // Tạo dữ liệu đặt vé
    const datVeData = {
        diaDiem,
        hoTen,
        soDienThoai,
        email,
        ngayKhoiHanh,
        soNguoi,
        loaiVe,
        ghiChu,
        trangThaiThanhToan: "Chưa thanh toán",
        ngayDat: new Date().toLocaleDateString('vi-VN'),
        maGiamGia: maGiamGiaHienTai,
        phanTramGiam: phanTramGiamHienTai
    };

    // Tính tổng tiền
    const giaVe = bangGiaVe[loaiVe] || 0;
    const tongTien = giaVe * parseInt(soNguoi);
    const tienGiam = tongTien * (phanTramGiamHienTai / 100);
    const tongTienSauGiam = tongTien - tienGiam;
    
    datVeData.tongTien = tongTienSauGiam;
    datVeData.tongTienTruocGiam = tongTien;
    datVeData.tienGiam = tienGiam;
    datVeData.giaVe = giaVe;
    datVeData.tienTaTraVe = 0;  // Chưa có tiền trả về

    // Lưu vào localStorage
    let danhSachDatVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
    danhSachDatVe.push(datVeData);
    localStorage.setItem("danhSachDatVe", JSON.stringify(danhSachDatVe));

    // Hiển thị thông báo thành công
    thongBaoDiv.className = "thong-bao thanh-cong";
    const thongBaoGiamGia = phanTramGiamHienTai > 0 ? `
            <li>Mã giảm giá: ${maGiamGiaHienTai}</li>
            <li>Giảm: ${tienGiam.toLocaleString('vi-VN')} VNĐ (${phanTramGiamHienTai}%)</li>
    ` : "";
    
    thongBaoDiv.innerHTML = `
        <h3>✓ Đặt vé thành công!</h3>
        <p>Cảm ơn bạn đã đặt vé du lịch. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
        <p><strong>Thông tin đặt vé:</strong></p>
        <ul>
            <li>Địa điểm: ${diaDiem}</li>
            <li>Họ tên: ${hoTen}</li>
            <li>Số điện thoại: ${soDienThoai}</li>
            <li>Email: ${email}</li>
            <li>Ngày khởi hành: ${new Date(ngayKhoiHanh).toLocaleDateString('vi-VN')}</li>
            <li>Số người: ${soNguoi}</li>
            <li>Loại vé: ${loaiVe}</li>
            ${thongBaoGiamGia}
            <li>Trạng thái: <strong>Chưa thanh toán</strong></li>
            <li><strong>Tổng tiền: ${tongTienSauGiam.toLocaleString('vi-VN')} VNĐ</strong></li>
        </ul>
    `;
    thongBaoDiv.style.display = "block";

    // Xóa form
    bieuMauDatVe.reset();
    xoaMaGiamGia();

    // Tự động quay về trang chủ sau 5 giây
    setTimeout(() => {
        window.location.href = "index.html";
    }, 5000);
});

/* 
==============================================================================
FILE: history.js
TÁC VỤ CHÍNH:
  • Hiển thị lịch sử tất cả các vé đã đặt
  • Quản lý chức năng hủy vé
  • Quản lý chức năng xóa tất cả lịch sử
  • Cập nhật trạng thái thanh toán của vé
  • Chuyển hướng đến trang thanh toán online
  • Kiểm tra trạng thái đăng nhập
  • Xử lý đăng xuất
  • Hiển thị danh sách vé theo thứ tự mới nhất trước
==============================================================================
*/

// Kiểm tra trạng thái đăng nhập
function kiemTraDangNhapHistory() {
    const nguoiDung = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    const trangThaiXacThuc = document.getElementById("trang-thai-xac-thuc-history");

    if (nguoiDung) {
        trangThaiXacThuc.style.display = "block";
        document.getElementById("ten-nguoi-dung-history").textContent = "Xin chào, " + nguoiDung.hoTen;
    } else {
        trangThaiXacThuc.style.display = "none";
    }
}

// Xử lý đăng xuất
const nutDangXuatHistory = document.getElementById("nut-dang-xuat-history");
if (nutDangXuatHistory) {
    nutDangXuatHistory.addEventListener("click", () => {
        localStorage.removeItem("nguoiDungDangNhap");
        window.location.href = "index.html";
    });
}

// Nút quay lại trang chủ
const nutQuayLaiHistory = document.getElementById("quay-ve-trang-chu");
if (nutQuayLaiHistory) {
    nutQuayLaiHistory.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Nút xóa lịch sử
const nutXoaLichSu = document.getElementById("nut-xoa-lich-su");
if (nutXoaLichSu) {
    nutXoaLichSu.addEventListener("click", () => {
        xoaLichSu();
    });
}

// Xóa vé cụ thể
function xoaVe(index) {
    if (confirm("Bạn có chắc chắn muốn hủy vé này?")) {
        let danhSachVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
        danhSachVe.splice(index, 1);
        localStorage.setItem("danhSachDatVe", JSON.stringify(danhSachVe));
        hienThiLichSu();
    }
}

// Cập nhật trạng thái thanh toán
function capNhatThanhToan(index) {
    let danhSachVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
    if (danhSachVe[index]) {
        danhSachVe[index].trangThaiThanhToan = danhSachVe[index].trangThaiThanhToan === "Đã thanh toán" 
            ? "Chưa thanh toán" 
            : "Đã thanh toán";
        localStorage.setItem("danhSachDatVe", JSON.stringify(danhSachVe));
        hienThiLichSu();
    }
}

// Thanh toán online
function thanhToanOnline(index) {
    let danhSachVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
    if (danhSachVe[index]) {
        // Lưu thông tin vé cần thanh toán vào sessionStorage
        sessionStorage.setItem("veThanhToan", JSON.stringify({
            index: index,
            ve: danhSachVe[index]
        }));
        // Chuyển sang trang thanh toán online
        window.location.href = "thanh-toan-online.html";
    }
}

// Hiển thị lịch sử đặt vé
function hienThiLichSu() {
    const danhSachVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
    const danhSachVeDiv = document.getElementById("danh-sach-ve");
    const thongBaoRong = document.getElementById("thong-bao-rong");

    if (danhSachVe.length === 0) {
        thongBaoRong.innerHTML = "<p>Bạn chưa đặt vé nào. <a href='ve.html'>Đặt vé ngay</a></p>";
        thongBaoRong.style.display = "block";
        danhSachVeDiv.innerHTML = "";
        return;
    }

    thongBaoRong.style.display = "none";
    danhSachVeDiv.innerHTML = "";

    // Hiển thị theo thứ tự mới nhất trước
    danhSachVe.reverse().forEach((ve, index) => {
        const veDiv = document.createElement("div");
        veDiv.className = "the-ve";
        const trangThaiClass = ve.trangThaiThanhToan === "Đã thanh toán" ? "da-thanh-toan" : "chua-thanh-toan";
        veDiv.classList.add(trangThaiClass);
        
        const tongTienHienThi = ve.tongTien ? `
                <div class="hang-chi-tiet">
                    <span class="nhan"><strong>Tổng Tiền:</strong></span>
                    <span class="gia-tri"><strong>${ve.tongTien.toLocaleString('vi-VN')} VNĐ</strong></span>
                </div>
        ` : "";
        
        const trangThaiThanhToanHienThi = ve.trangThaiThanhToan ? `
                <div class="hang-chi-tiet">
                    <span class="nhan"><strong>Thanh toán:</strong></span>
                    <span class="gia-tri trang-thai-thanh-toan">${ve.trangThaiThanhToan}</span>
                </div>
        ` : "";
        
        veDiv.innerHTML = `
            <div class="so-thu-tu">Vé #${danhSachVe.length - index}</div>
            <div class="chi-tiet-ve">
                <div class="hang-chi-tiet">
                    <span class="nhan">Địa điểm:</span>
                    <span class="gia-tri">${ve.diaDiem}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Họ tên:</span>
                    <span class="gia-tri">${ve.hoTen}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Số điện thoại:</span>
                    <span class="gia-tri">${ve.soDienThoai}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Email:</span>
                    <span class="gia-tri">${ve.email}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Ngày khởi hành:</span>
                    <span class="gia-tri">${ve.ngayKhoiHanh}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Số người:</span>
                    <span class="gia-tri">${ve.soNguoi}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Loại vé:</span>
                    <span class="gia-tri">${ve.loaiVe}</span>
                </div>
                <div class="hang-chi-tiet">
                    <span class="nhan">Ngày đặt:</span>
                    <span class="gia-tri">${ve.ngayDat}</span>
                </div>
                ${ve.ghiChu ? `
                <div class="hang-chi-tiet">
                    <span class="nhan">Ghi chú:</span>
                    <span class="gia-tri">${ve.ghiChu}</span>
                </div>
                ` : ""}
                ${tongTienHienThi}
                ${trangThaiThanhToanHienThi}
            </div>
            <div class="hang-nut-hanh-dong">
                ${ve.trangThaiThanhToan === "Đã thanh toán" ? 
                    `<button class="nut-thanh-toan-online" disabled>✓ Đã Thanh Toán</button>` : 
                    `<button class="nut-thanh-toan-online" onclick="thanhToanOnline(${danhSachVe.length - index - 1})">💳 Thanh Toán Online</button>`
                }
                <button class="nut-huy-ve" onclick="xoaVe(${danhSachVe.length - index - 1})">🗑️ Hủy Vé</button>
            </div>
        `;
        danhSachVeDiv.appendChild(veDiv);
    });
}

// Xóa tất cả lịch sử
function xoaLichSu() {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả lịch sử đặt vé?")) {
        localStorage.removeItem("danhSachDatVe");
        hienThiLichSu();
    }
}

// Tải dữ liệu khi trang load
kiemTraDangNhapHistory();
hienThiLichSu();

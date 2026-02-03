/* 
==============================================================================
FILE: thanh-toan-online.js
TÁC VỤ CHÍNH:
  • Lấy thông tin vé cần thanh toán từ sessionStorage
  • Hiển thị chi tiết vé trên trang thanh toán
  • Quản lý lựa chọn phương thức thanh toán
  • Xác thực thông tin nhập vào cho mỗi phương thức
  • Giả lập xử lý thanh toán
  • Cập nhật trạng thái vé thành \"Đã thanh toán\"
  • Format dữ liệu nhập (số thẻ, hạn sử dụng, CVV)
  • Quay lại trang lịch sử sau khi thanh toán thành công
==============================================================================
*/

// Lấy thông tin vé cần thanh toán từ sessionStorage
let veThanhToan = null;

document.addEventListener("DOMContentLoaded", () => {
    const veData = sessionStorage.getItem("veThanhToan");
    
    if (!veData) {
        window.location.href = "history.html";
        return;
    }

    veThanhToan = JSON.parse(veData);
    hienThiChiTietVe();
});

// Hiển thị chi tiết vé cần thanh toán
function hienThiChiTietVe() {
    const ve = veThanhToan.ve;
    const chiTietDiv = document.getElementById("chi-tiet-ve");
    
    chiTietDiv.innerHTML = `
        <div class="hang-thong-tin">
            <span class="nhan">Địa Điểm:</span>
            <span class="gia-tri">${ve.diaDiem}</span>
        </div>
        <div class="hang-thong-tin">
            <span class="nhan">Họ Tên:</span>
            <span class="gia-tri">${ve.hoTen}</span>
        </div>
        <div class="hang-thong-tin">
            <span class="nhan">Số Người:</span>
            <span class="gia-tri">${ve.soNguoi}</span>
        </div>
        <div class="hang-thong-tin">
            <span class="nhan">Loại Vé:</span>
            <span class="gia-tri">${ve.loaiVe}</span>
        </div>
        <div class="hang-thong-tin">
            <span class="nhan">Ngày Khởi Hành:</span>
            <span class="gia-tri">${ve.ngayKhoiHanh}</span>
        </div>
        <div class="hang-tong-tien">
            <span class="nhan">Tổng Tiền:</span>
            <span class="gia-tri">${ve.tongTien.toLocaleString('vi-VN')} VNĐ</span>
        </div>
    `;
}

// Chọn phương thức thanh toán
function chonPhuongThuc(event, phuongThuc) {
    // Cập nhật radio button
    document.querySelectorAll('input[name="phuong-thuc"]').forEach(radio => {
        radio.checked = radio.value === phuongThuc;
    });

    // Cập nhật style
    document.querySelectorAll(".phuong-thuc-item").forEach(item => {
        item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    // Hiển thị form phù hợp
    document.querySelectorAll(".form-thong-tin-the").forEach(form => {
        form.classList.remove("active");
    });

    if (phuongThuc === "the-tin-dung") {
        document.getElementById("form-thong-tin-the").classList.add("active");
    } else if (phuongThuc === "vi-dien-tu") {
        document.getElementById("form-thong-tin-vi").classList.add("active");
    } else if (phuongThuc === "chuyen-khoan") {
        document.getElementById("form-thong-tin-nh").classList.add("active");
    }
}

// Xác nhận thanh toán
function xacNhanThanhToan() {
    const phuongThuc = document.querySelector('input[name="phuong-thuc"]:checked').value;
    const thongBaoLoi = document.getElementById("thong-bao-loi");
    
    thongBaoLoi.classList.remove("active");

    // Validate thông tin dựa trên phương thức
    if (phuongThuc === "the-tin-dung") {
        const soThe = document.getElementById("so-the").value.trim();
        const hanSuDung = document.getElementById("han-su-dung").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const tenChuThe = document.getElementById("ten-chu-the").value.trim();

        if (!soThe || !hanSuDung || !cvv || !tenChuThe) {
            hienThiBao("Vui lòng điền đầy đủ thông tin thẻ!");
            return;
        }

        // Kiểm tra định dạng
        if (soThe.replace(/\s/g, "").length < 15) {
            hienThiBao("Số thẻ không hợp lệ!");
            return;
        }
    } else if (phuongThuc === "vi-dien-tu") {
        const soDienThoai = document.getElementById("so-dien-thoai-vi").value.trim();
        
        if (!soDienThoai) {
            hienThiBao("Vui lòng nhập số điện thoại ví điện tử!");
            return;
        }

        if (!/^0\d{9}$/.test(soDienThoai)) {
            hienThiBao("Số điện thoại không hợp lệ!");
            return;
        }
    }

    // Giả lập xử lý thanh toán
    thanhToanGiaLap(phuongThuc);
}

// Thanh toán giả lập
function thanhToanGiaLap(phuongThuc) {
    const nutThanhToan = document.getElementById("nut-thanh-toan");
    nutThanhToan.disabled = true;
    nutThanhToan.textContent = "⏳ Đang xử lý...";

    // Giả lập xử lý trong 2 giây
    setTimeout(() => {
        // Cập nhật trạng thái vé thành "Đã thanh toán"
        let danhSachVe = JSON.parse(localStorage.getItem("danhSachDatVe")) || [];
        danhSachVe[veThanhToan.index].trangThaiThanhToan = "Đã thanh toán";
        localStorage.setItem("danhSachDatVe", JSON.stringify(danhSachVe));

        // Xóa dữ liệu thanh toán tạm
        sessionStorage.removeItem("veThanhToan");

        // Hiển thị thông báo thành công
        alert("✅ Thanh toán thành công!\n\nVé của bạn đã được cập nhật trạng thái.");
        
        // Quay về trang lịch sử
        window.location.href = "history.html";
    }, 2000);
}

// Hiển thị thông báo lỗi
function hienThiBao(thongBao) {
    const thongBaoLoi = document.getElementById("thong-bao-loi");
    thongBaoLoi.textContent = "⚠️ " + thongBao;
    thongBaoLoi.classList.add("active");
}

// Hủy chương trình
function huyChuongTrinh() {
    if (confirm("Bạn có chắc chắn muốn hủy thanh toán?")) {
        sessionStorage.removeItem("veThanhToan");
        window.location.href = "history.html";
    }
}

// Format số thẻ
document.addEventListener("input", (e) => {
    if (e.target.id === "so-the") {
        let value = e.target.value.replace(/\s/g, "");
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        let formatted = "";
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += " ";
            }
            formatted += value[i];
        }
        e.target.value = formatted;
    }

    // Format hạn sử dụng
    if (e.target.id === "han-su-dung") {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4);
        }
        e.target.value = value;
    }

    // Format CVV
    if (e.target.id === "cvv") {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    }
});

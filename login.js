/* 
==============================================================================
FILE: login.js
TÁC VỤ CHÍNH:
  • Xử lý việc đăng ký tài khoản mới
  • Xử lý việc đăng nhập với tài khoản hiện có
  • Lưu thông tin tài khoản vào localStorage
  • Kiểm tra tính hợp lệ của dữ liệu nhập vào
  • Chuyển đổi giữa form đăng nhập và form đăng ký
  • Hiển thị thông báo lỗi và thành công
==============================================================================
*/

// Nút quay lại trang chủ
const nutQuayLai = document.getElementById("quay-ve-trang-chu");
if (nutQuayLai) {
    nutQuayLai.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Xử lý đăng nhập
const formDangNhap = document.getElementById("form-dang-nhap");
const thongBaoDiv = document.getElementById("thong-bao-auth");

formDangNhap.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email-dang-nhap").value;
    const matKhau = document.getElementById("mat-khau-dang-nhap").value;

    // Kiểm tra tài khoản
    let danhSachTaiKhoan = JSON.parse(localStorage.getItem("danhSachTaiKhoan")) || [];
    const taiKhoan = danhSachTaiKhoan.find(tk => tk.email === email && tk.matKhau === matKhau);

    if (taiKhoan) {
        // Lưu thông tin đăng nhập
        localStorage.setItem("nguoiDungDangNhap", JSON.stringify({
            hoTen: taiKhoan.hoTen,
            email: taiKhoan.email
        }));

        // Hiển thị thông báo thành công
        thongBaoDiv.className = "thong-bao thanh-cong";
        thongBaoDiv.innerHTML = `
            <h3>✓ Đăng nhập thành công!</h3>
            <p>Chào mừng ${taiKhoan.hoTen}!</p>
        `;
        thongBaoDiv.style.display = "block";

        // Quay về trang chủ
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        // Hiển thị thông báo lỗi
        thongBaoDiv.className = "thong-bao loi";
        thongBaoDiv.innerHTML = "<h3>✗ Email hoặc mật khẩu không chính xác!</h3>";
        thongBaoDiv.style.display = "block";
    }

    // Xóa form
    formDangNhap.reset();
});

// Xử lý đăng ký
const formDangKy = document.getElementById("form-dang-ky");

formDangKy.addEventListener("submit", (e) => {
    e.preventDefault();

    const hoTen = document.getElementById("ho-ten-dang-ky").value;
    const email = document.getElementById("email-dang-ky").value;
    const matKhau = document.getElementById("mat-khau-dang-ky").value;
    const xacNhanMatKhau = document.getElementById("xac-nhan-mat-khau").value;

    // Kiểm tra mật khẩu trùng khớp
    if (matKhau !== xacNhanMatKhau) {
        thongBaoDiv.className = "thong-bao loi";
        thongBaoDiv.innerHTML = "<h3>✗ Mật khẩu không trùng khớp!</h3>";
        thongBaoDiv.style.display = "block";
        return;
    }

    // Kiểm tra xem email đã tồn tại hay chưa
    let danhSachTaiKhoan = JSON.parse(localStorage.getItem("danhSachTaiKhoan")) || [];
    if (danhSachTaiKhoan.find(tk => tk.email === email)) {
        thongBaoDiv.className = "thong-bao loi";
        thongBaoDiv.innerHTML = "<h3>✗ Email này đã được đăng ký!</h3>";
        thongBaoDiv.style.display = "block";
        return;
    }

    // Lưu tài khoản mới
    danhSachTaiKhoan.push({
        hoTen: hoTen,
        email: email,
        matKhau: matKhau
    });
    localStorage.setItem("danhSachTaiKhoan", JSON.stringify(danhSachTaiKhoan));

    // Hiển thị thông báo thành công
    thongBaoDiv.className = "thong-bao thanh-cong";
    thongBaoDiv.innerHTML = `
        <h3>✓ Đăng ký thành công!</h3>
        <p>Chào mừng ${hoTen}! Vui lòng đăng nhập.</p>
    `;
    thongBaoDiv.style.display = "block";

    // Xóa form
    formDangKy.reset();

    // Chuyển sang form đăng nhập
    setTimeout(() => {
        chuyenSangDangNhap();
    }, 2000);
});

// Hàm chuyển sang form đăng nhập
function chuyenSangDangNhap(event) {
    if (event) {
        event.preventDefault();
    }
    document.getElementById("form-dang-nhap-container").style.display = "block";
    document.getElementById("form-dang-ky-container").style.display = "none";
}

// Hàm chuyển sang form đăng ký
function chuyenSangDangKy(event) {
    if (event) {
        event.preventDefault();
    }
    document.getElementById("form-dang-nhap-container").style.display = "none";
    document.getElementById("form-dang-ky-container").style.display = "block";
}
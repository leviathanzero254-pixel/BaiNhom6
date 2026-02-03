/* 
==============================================================================
FILE: chitiet.js
TÁC VỤ CHÍNH:
  • Lấy dữ liệu từ localStorage được gửi từ trang chủ
  • Hiển thị thông tin chi tiết của một khu du lịch cụ thể
  • Hiển thị hình ảnh chính và thư viện ảnh bổ sung
  • Mô tả chi tiết về địa điểm du lịch
  • Xử lý nút quay lại trang chủ
==============================================================================
*/

// Nút quay lại trang chủ
const quayVe = document.getElementById("quay-ve-trang-chu");
if (quayVe) {
    quayVe.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

// Lấy và tải dữ liệu lên trang chi tiết
const dulieuNhan = JSON.parse(localStorage.getItem("dulieuTrangChu"));

function hienThiChiTiet(data) {
    if (!data) {
        document.body.innerHTML = "<p>Đìm không tìm thấy thông tin địa điểm.</p>";
        return;
    }

    const detailContainer = document.getElementById("noi-dung");

    // Tạo nội dung chính
    detailContainer.innerHTML = `
        <h1>${data.name}</h1>
        <img src="${data.image}" alt="${data.name}">
        <p>${data.description}</p>
        <h2>Thư viện hình ảnh</h2>
        <div id="thu-vien-hinh-anh" class="thu-vien-hinh-anh"></div>
    `;

    // Hiển thị thư viện ảnh bổ sung
    const galleryContainer = document.getElementById("thu-vien-hinh-anh");
    for (let i = 0; i < data.hinhAnh.length; i++) {
        // tạo wrapper cho ảnh + nút (nếu cần)
        const wrapper = document.createElement('div');
        wrapper.className = 'thumb-wrapper';

        const img = document.createElement("img");
        img.src = data.hinhAnh[i];
        img.alt = `${data.name} ${i + 1}`;

        // Make first 3 images clickable/zoomable
        if (i < 3) {
            img.classList.add('zoomable');
            img.addEventListener('click', () => {
                openLightbox(data.hinhAnh[i], `${data.name} ${i + 1}`);
            });
        }

        wrapper.appendChild(img);
        galleryContainer.appendChild(wrapper);
    }

    // Thêm 1 nút 'Đặt vé' duy nhất ở giữa các 3 hình ảnh
    const containerNutDatVe = document.createElement('div');
    containerNutDatVe.style.textAlign = 'center';
    containerNutDatVe.style.marginTop = '20px';

    const nutDatVe = document.createElement('button');
    nutDatVe.className = 'nut-dat-ve';
    nutDatVe.type = 'button';
    nutDatVe.textContent = 'Đặt vé';
    nutDatVe.addEventListener('click', (e) => {
        e.stopPropagation();
        // Lưu thông tin điểm đến tạm thời vào sessionStorage
        const veDatTruoc = {
            diaDiem: data.name,
            diaDiemId: data.id || data.name,
            soNguoi: 1,
            loaiVe: 'Người lớn (1.000.000 VNĐ)'
        };
        sessionStorage.setItem('veDatTruoc', JSON.stringify(veDatTruoc));
        // Chuyển tới trang đặt vé
        window.location.href = 've.html';
    });

    containerNutDatVe.appendChild(nutDatVe);
    galleryContainer.parentNode.insertBefore(containerNutDatVe, galleryContainer.nextSibling);

    // Create lightbox overlay (single instance)
    if (!document.getElementById('lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = 'lightbox-overlay hidden';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const bigImg = document.createElement('img');
        bigImg.className = 'lightbox-image';
        bigImg.alt = '';

        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';

        content.appendChild(bigImg);
        content.appendChild(caption);
        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Close on click outside image
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    function openLightbox(src, text) {
        const overlay = document.getElementById('lightbox-overlay');
        const bigImg = overlay.querySelector('.lightbox-image');
        const caption = overlay.querySelector('.lightbox-caption');
        bigImg.src = src;
        bigImg.alt = text || '';
        caption.textContent = text || '';
        overlay.classList.remove('hidden');
        // allow zoom-out cursor on overlay for mobile (tap to close)
        overlay.style.touchAction = 'manipulation';
    }

    function closeLightbox() {
        const overlay = document.getElementById('lightbox-overlay');
        if (!overlay) return;
        overlay.classList.add('hidden');
        const bigImg = overlay.querySelector('.lightbox-image');
        bigImg.src = '';
    }
}

// Gọi hàm hiển thị khi trang tải
hienThiChiTiet(dulieuNhan);
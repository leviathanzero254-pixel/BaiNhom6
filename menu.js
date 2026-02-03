/* 
==============================================================================
FILE: menu.js
TÁC VỤ CHÍNH:
  • Quản lý menu responsive hamburger
  • Toggle menu khi click vào nút hamburger
  • Đóng menu khi click vào link
  • Đóng menu khi resize màn hình lên kích thước desktop
==============================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.getElementById("menu-links");

    // Kiểm tra xem các phần tử có tồn tại hay không
    if (menuToggle && menuLinks) {
        // Toggle menu khi click vào nút hamburger
        menuToggle.addEventListener("click", () => {
            menuLinks.classList.toggle("active");
        });

        // Đóng menu khi click vào một link
        menuLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuLinks.classList.remove("active");
            });
        });

        // Đóng menu khi resize màn hình
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                menuLinks.classList.remove("active");
            }
        });
    }
});

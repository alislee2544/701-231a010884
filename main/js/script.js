// js/script.js
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // BÀI 1: DANH SÁCH SẢN PHẨM
    // ==========================================
    // Thay thế đoạn mảng sản phẩm cũ bằng mảng mới có thêm thuộc tính 'image'
const products = [
    { id: 1, name: 'Điện thoại iPhone 15', price: '20,000,000đ', image: 'images/iphone.jpg' },
    { id: 2, name: 'Laptop Dell XPS 15', price: '35,000,000đ', image: 'images/dell.jpg' },
    { id: 3, name: 'Tai nghe AirPods Pro', price: '5,000,000đ', image: 'images/airpods.jpg' },
    { id: 4, name: 'Đồng hồ Apple Watch', price: '10,000,000đ', image: 'images/watch.jpg' },
    { id: 5, name: 'Bàn phím cơ Keychron', price: '2,500,000đ', image: 'images/keyboard.jpg' }
];

// Cập nhật hàm renderProducts để tạo thêm thẻ hiển thị ảnh
const renderProducts = (list) => {
    productGrid.innerHTML = '';
    if (list.length === 0) {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'product-card';
            
            // Tạo thẻ ảnh sản phẩm
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '100%';
            img.style.height = '150px';
            img.style.objectFit = 'contain';
            img.style.marginBottom = '10px';

            const name = document.createElement('h3');
            name.textContent = item.name;
            
            const price = document.createElement('p');
            price.textContent = item.price;
            price.style.color = '#e44d26';
            price.style.fontWeight = 'bold';
            
            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(price);
            productGrid.appendChild(div);
        });
    }
};
    // ==========================================
    // BÀI 2: FORM ĐĂNG KÝ
    // ==========================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Ngăn chặn reload trang

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const terms = document.getElementById('terms').checked;
            
            const pwdError = document.getElementById('pwd-error');
            const successMsg = document.getElementById('success-msg');

            // Validate mật khẩu: Ít nhất 8 ký tự, có chữ hoa, thường, số
            const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            
            if (!pwdRegex.test(password)) {
                pwdError.style.display = 'block';
                successMsg.style.display = 'none';
                return;
            } else {
                pwdError.style.display = 'none';
            }

            if (!terms) {
                alert("Vui lòng đồng ý với điều khoản!");
                return;
            }

            // Nếu hợp lệ, lưu vào LocalStorage
            const userData = { name, email }; // Không nên lưu trực tiếp password plain text
            localStorage.setItem('userAccount', JSON.stringify(userData));
            
            successMsg.style.display = 'block';
            registerForm.reset();
        });
    }

    // ==========================================
    // BÀI 3: ĐỒNG HỒ ĐẾM NGƯỢC
    // ==========================================
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        let timeLeft = 10 * 60; // 10 phút tính bằng giây
        let timerInterval;

        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            // Format MM:SS
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Thêm animation nếu dưới 1 phút (60 giây)
            if (timeLeft <= 60 && timeLeft > 0) {
                timerDisplay.classList.add('danger');
            }

            // Hết giờ
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerDisplay.classList.remove('danger');
                alert("Đã hết thời gian!"); // Modal alert theo yêu cầu
            }
            timeLeft--;
        };

        // Chạy hàm updateTimer mỗi 1 giây (1000ms)
        updateTimer(); // Gọi ngay lập tức để không bị delay 1s đầu
        timerInterval = setInterval(updateTimer, 1000);

        // Clear interval khi rời trang để tránh memory leak (Tuỳ chọn thêm để an toàn)
        window.addEventListener('beforeunload', () => {
            clearInterval(timerInterval);
        });
    }
});
const galleryImages = document.querySelectorAll('.gallery-grid .gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close-btn');

if (lightbox && galleryImages.length > 0) {
    // Lặp qua từng ảnh nhỏ và gắn sự kiện click
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Hiển thị khung phóng to
            lightboxImg.src = img.src; // Gán đường dẫn ảnh nhỏ qua ảnh lớn
        });
    });

    // Sự kiện click vào nút X để tắt
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Tự động đóng nếu người dùng nhấn lệch ra ngoài vùng ảnh (vùng nền đen)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // BÀI 1: DANH SÁCH SẢN PHẨM (CÓ ẢNH)
    // ==========================================
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        // Dữ liệu sản phẩm có thêm hình ảnh
        // Dữ liệu sản phẩm Xiaomi (Bạn nhớ chuẩn bị ảnh xiaomi1.jpg -> xiaomi8.jpg nhé)
const products = [
    { id: 1, name: 'Xiaomi 14 Ultra', price: '32,990,000đ', image: 'images/xiaomi1.jpg' },
    { id: 2, name: 'Xiaomi 13 Pro', price: '24,990,000đ', image: 'images/xiaomi2.jpg' },
    { id: 3, name: 'Redmi Note 13 Pro+', price: '10,490,000đ', image: 'images/xiaomi3.jpg' },
    { id: 4, name: 'POCO X6 Pro 5G', price: '8,990,000đ', image: 'images/xiaomi4.jpg' },
    { id: 5, name: 'Redmi Note 12', price: '4,590,000đ', image: 'images/xiaomi5.jpg' },
    { id: 6, name: 'Xiaomi 12T', price: '11,990,000đ', image: 'images/xiaomi6.jpg' },
    { id: 7, name: 'Redmi 13C', price: '3,290,000đ', image: 'images/xiaomi7.jpg' },
    { id: 8, name: 'POCO F5 Pro', price: '12,990,000đ', image: 'images/xiaomi8.jpg' }
];

        const searchInput = document.getElementById('search-input');
        const errorMsg = document.getElementById('error-msg');

        const renderProducts = (list) => {
            productGrid.innerHTML = ''; // Xóa rỗng trước khi render
            if (list.length === 0) {
                errorMsg.style.display = 'block';
            } else {
                errorMsg.style.display = 'none';
                list.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'product-card';
                    
                    // Thẻ ảnh
                    const img = document.createElement('img');
                    img.src = item.image;
                    img.alt = item.name;
                    img.style.width = '100%';
                    img.style.height = '150px';
                    img.style.objectFit = 'contain';
                    img.style.marginBottom = '10px';

                    // Tên
                    const name = document.createElement('h3');
                    name.textContent = item.name;
                    
                    // Giá
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

        // Render lần đầu
        renderProducts(products);

        // Tìm kiếm
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const keyword = e.target.value.toLowerCase().trim();
                const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
                renderProducts(filtered);
            });
        }
    }

    // ==========================================
    // BÀI 2: FORM ĐĂNG KÝ
    // ==========================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const terms = document.getElementById('terms').checked;
            
            const pwdError = document.getElementById('pwd-error');
            const successMsg = document.getElementById('success-msg');

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

            const userData = { name, email }; 
            localStorage.setItem('userAccount', JSON.stringify(userData));
            
            successMsg.style.display = 'block';
            registerForm.reset();
        });
    }

    // ==========================================
    // BÀI 3: ĐỒNG HỒ ĐẾM NGƯỢC
    // ==========================================
 const timerDisplay = document.getElementById('timer-display');
    const timeInput = document.getElementById('time-input');
    const startTimerBtn = document.getElementById('start-timer-btn');

    if (timerDisplay && timeInput && startTimerBtn) {
        let timerInterval;

        const startTimer = () => {
            // Lấy giá trị phút từ ô input
            let minutesInput = parseInt(timeInput.value);
            
            // Validate: Nếu nhập sai, không nhập, hoặc nhập số âm
            if (isNaN(minutesInput) || minutesInput <= 0) {
                alert("Vui lòng nhập số phút hợp lệ (lớn hơn 0)!");
                return;
            }

            let timeLeft = minutesInput * 60; // Đổi phút ra giây

            // RẤT QUAN TRỌNG: Xóa bộ đếm cũ (nếu đang chạy) để tránh lỗi đếm lùi quá nhanh (chạy đè nhiều interval)
            clearInterval(timerInterval);
            timerDisplay.classList.remove('danger');

            const updateTimer = () => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                
                // Format định dạng MM:SS
                timerDisplay.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                // Hiệu ứng đỏ nhấp nháy khi còn <= 1 phút
                if (timeLeft <= 60 && timeLeft > 0) {
                    timerDisplay.classList.add('danger');
                } else {
                    timerDisplay.classList.remove('danger');
                }

                // Xử lý khi hết giờ
                if (timeLeft === 0) {
                    clearInterval(timerInterval);
                    timerDisplay.classList.remove('danger');
                    // setTimeout để trình duyệt kịp hiển thị 00:00 trước khi popup hiện lên chặn lại
                    setTimeout(() => alert("Đã hết thời gian!"), 100); 
                }
                timeLeft--;
            };

            // Gọi hàm ngay lập tức để không bị delay 1 giây đầu tiên
            updateTimer(); 
            // Bắt đầu chu kỳ 1 giây
            timerInterval = setInterval(updateTimer, 1000);
        };

        // Gắn sự kiện click cho nút "Bắt đầu đếm"
        startTimerBtn.addEventListener('click', startTimer);

        // Xóa interval khi người dùng rời trang để tránh memory leak
        window.addEventListener('beforeunload', () => {
            clearInterval(timerInterval);
        });
    }
    // ==========================================
    // GALLERY ẢNH Ở TRANG ĐIỂM DANH
    // ==========================================
    const galleryImages = document.querySelectorAll('.gallery-grid .gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close-btn');

    if (lightbox && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex'; 
                lightboxImg.src = img.src; 
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});

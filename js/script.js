document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // BÀI 1: DANH SÁCH SẢN PHẨM (CÓ ẢNH)
    // ==========================================
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        // Dữ liệu sản phẩm có thêm hình ảnh
        const products = [
            { id: 1, name: 'Điện thoại iPhone 15', price: '20,000,000đ', image: 'images/img1.jpg' },
            { id: 2, name: 'Laptop Dell XPS 15', price: '35,000,000đ', image: 'images/img2.jpg' },
            { id: 3, name: 'Tai nghe AirPods Pro', price: '5,000,000đ', image: 'images/img3.jpg' },
            { id: 4, name: 'Đồng hồ Apple Watch', price: '10,000,000đ', image: 'images/img4.jpg' },
            { id: 5, name: 'Bàn phím cơ Keychron', price: '2,500,000đ', image: 'images/img5.jpg' }
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
    if (timerDisplay) {
        let timeLeft = 10 * 60; 
        let timerInterval;

        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 60 && timeLeft > 0) {
                timerDisplay.classList.add('danger');
            }

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerDisplay.classList.remove('danger');
                alert("Đã hết thời gian!"); 
            }
            timeLeft--;
        };

        updateTimer(); 
        timerInterval = setInterval(updateTimer, 1000);

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

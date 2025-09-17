document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const categoryTitle = document.querySelector('#category-title');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.getElementById('lightbox-image');
    const modalVideo = document.getElementById('lightbox-video');
    const closeModal = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const thumbnailContainer = document.querySelector('.thumbnail-container');

    let currentIndex = 0;
    let currentItems = [];

    const portfolioItems = [
        // Videos
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video1.mp4', title: 'My Millennium Ad' },
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video2.mp4', title: 'Welcome to Arizona Sizzle Reel' },
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video3.mp4', title: 'Hospitality Video Reel' },
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video4.mp4', title: 'Mob Streaming Asset' },
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video5.mp4', title: 'Mob Streaming Asset' },
        { category: 'Videos / Motion Graphics', src: 'assets/Videos/video6.mp4', title: 'Mob Streaming Asset' },

        // Brand Design
        { category: 'Brand Design', src: 'assets/Brand/ajco-brokerage.pdf', title: 'AJCO Brokerage Brand Design' },
        { category: 'Brand Design', src: 'assets/Brand/firmland-brand.pdf', title: 'Firmland Brand Design' },
        { category: 'Brand Design', src: 'assets/Brand/me-brand.pdf', title: 'Metro Essentials Brand Design' },
        { category: 'Brand Design', src: 'assets/Brand/tp-brand.pdf', title: 'Task Pilot Brand Design' },

        // Graphic Design - Social Media
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social11.jpg', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social1.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social2.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social3.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social4.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social5.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social6.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social12.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social13.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social7.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social8.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social9.png', title: 'Social Media Post' },
        { category: 'Graphic Design-Social Media', src: 'assets/Social/social10.png', title: 'Social Media Post' },

        // Graphic Design - Email Design
        { category: 'Graphic Design-Email Design', src: 'assets/Email/email1.png', title: 'Email Design' },
        { category: 'Graphic Design-Email Design', src: 'assets/Email/email2.png', title: 'Email Design' },
        { category: 'Graphic Design-Email Design', src: 'assets/Email/email3.jpg', title: 'Email Design' },
        { category: 'Graphic Design-Email Design', src: 'assets/Email/email4.jpg', title: 'Email Design' },
        { category: 'Graphic Design-Email Design', src: 'assets/Email/email5.jpg', title: 'Email Design' },
        

        // Graphic Design - Print Collaterals
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print1.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print2.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print3.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print4.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print5.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print6.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print7.png', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print8.jpg', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print9.jpg', title: 'Print Collateral' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Print/print10.pdf', title: 'Proxy Statement' },
       
        

        // Graphic Design - Custom Print
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom.png', title: 'Custom Print' },
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom1.jpg', title: 'Custom Print' },
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom2.jpg', title: 'Custom Print' },
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom3.jpg', title: 'Custom Print' },
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom4.jpg', title: 'Custom Print' },
        { category: 'Graphic Design-Custom Print', src: 'assets/Custom/custom5.jpg', title: 'Custom Print' },
       


        // Graphic Design - Large Scale Print
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale/mockup1.png', title: 'Heritage Hotel Banner' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale/mockup2.png', title: 'Heritage Hotel Billboard' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale/mockup3.png', title: 'Heritage Hotel Billboard' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale/mockup4.png', title: 'Heritage Hotel Billboard' },

        // Logo Design
        { category: 'Logo Design', src: 'assets/Logo/logo1.png', title: 'Firmland Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo2.png', title: 'FIG Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo3.png', title: 'Welcome to Arizona Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo4.png', title: 'Task Pilot Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo5.png', title: 'Metro Essentials Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo6.png', title: 'Rock of Ages Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo7.png', title: 'Manhattan Spa Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo8.png', title: 'Manhattan Spa Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo9.png', title: 'MOB Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo10.png', title: 'Paella Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo11.png', title: 'Tdesign Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo12.png', title: 'Sage AI Logo' },
        { category: 'Logo Design', src: 'assets/Logo/logo13.png', title: 'Efficio Logo' },
        
        // Mobile UI/UX
        { category: 'Mobile UI/UX', src: 'assets/Mobile/tp-mobile-app.pdf', title: 'Task Pilot Mobile App' },
        
        // Web UI/UX
        { category: 'Web UI/UX', src: 'assets/Web/firmland-lp.pdf', title: 'Firmland Landing Page' },
        { category: 'Web UI/UX', src: 'assets/Web/connext-lp.pdf', title: 'Connext Landing Page' },
        { category: 'Web UI/UX', src: 'assets/Web/sage-lp.pdf', title: 'SageAI Landing Page' },


        
    ];

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        categoryTitle.textContent = category.replace(/%20/g, ' ');
        const filteredItems = portfolioItems.filter(item => item.category === category);
        displayPortfolioItems(filteredItems);
    } else {
        categoryTitle.textContent = 'All Projects';
        displayPortfolioItems(portfolioItems);
    }

    function displayPortfolioItems(items) {
        portfolioGrid.innerHTML = '';
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('portfolio-item');
            if (item.category === 'Logo Design') {
                itemElement.classList.add('logo-design-item');
            }
            if (item.category === 'Graphic Design-Email Design') {
                itemElement.classList.add('email-design-item');
            }
            itemElement.dataset.src = item.src;
            itemElement.dataset.title = item.title;
            itemElement.dataset.index = index;
            
            const isPdf = item.src.toLowerCase().endsWith('.pdf');
            const isVideo = item.src.toLowerCase().endsWith('.mp4');

            if (isPdf) {
                itemElement.innerHTML = `
                    <div class="pdf-preview">
                        <i class="fas fa-file-pdf"></i>
                        <span>${item.title}</span>
                    </div>`;
                itemElement.addEventListener('click', () => {
                    window.open(item.src, '_blank');
                });
            } else if (isVideo) {
                 itemElement.innerHTML = `<video src="${item.src}#t=0.5" muted preload="metadata" loop></video>`;
                 itemElement.addEventListener('click', () => openLightbox(index, items));
                 itemElement.addEventListener('mouseenter', () => {
                    itemElement.querySelector('video').play();
                 });
                 itemElement.addEventListener('mouseleave', () => {
                    const video = itemElement.querySelector('video');
                    video.pause();
                    video.currentTime = 0;
                 });
            } else {
                itemElement.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
                itemElement.addEventListener('click', () => openLightbox(index, items));
            }
            portfolioGrid.appendChild(itemElement);
        });
    }

    function openLightbox(index, items) {
        currentIndex = index;
        currentItems = items;
        showItem(currentIndex);
        modal.classList.add('active');
        generateThumbnails();
    }

    function showItem(index) {
        const item = currentItems[index];
        const src = item.src;
        const type = src.split('.').pop().toLowerCase();

        if (type === 'mp4') {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = src;
            modalVideo.play();
        } else {
            modalVideo.pause();
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = src;
        }
        
        if (item.category === 'Logo Design') {
            modalImage.classList.add('logo-preview');
        } else {
            modalImage.classList.remove('logo-preview');
        }
    }

    function generateThumbnails() {
        thumbnailContainer.innerHTML = '';
        currentItems.forEach((item, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.classList.add('thumbnail');
            
            if (item.src.toLowerCase().endsWith('.mp4')) {
                thumbnail.src = 'assets/video-placeholder.png';
            } else {
                thumbnail.src = item.src;
            }
            
            thumbnail.alt = item.title;
            thumbnail.dataset.index = index;
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                showItem(currentIndex);
                updateThumbnails();
            });
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    function updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            if (i === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentItems.length;
        showItem(currentIndex);
        updateThumbnails();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        showItem(currentIndex);
        updateThumbnails();
    }

    function closeTheModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = "";
        modalImage.classList.remove('logo-preview');
        thumbnailContainer.innerHTML = '';
    }

    closeModal.addEventListener('click', closeTheModal);
    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });

    // Swipe functionality
    let touchstartX = 0;
    let touchendX = 0;

    modal.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    modal.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchendX < touchstartX) {
            showNext();
        }
        if (touchendX > touchstartX) {
            showPrev();
        }
    }
});

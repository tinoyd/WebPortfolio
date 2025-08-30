document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const categoryTitle = document.querySelector('#category-title');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.getElementById('lightbox-image');
    const modalVideo = document.getElementById('lightbox-video');
    const closeModal = document.querySelector('.close-button');

    const portfolioItems = [
        // Videos
        { category: 'Videos', src: 'assets/Videos/Video Reel.mp4', title: 'Hospitality Video Reel' },
        { category: 'Videos', src: 'assets/Videos/WtA Sizzle reel.mp4', title: 'Welcome to Arizona Sizzle Reel' },
        { category: 'Videos', src: 'assets/Videos/My Millennium.mp4', title: 'My Millennium Ad' },

        // Brand Design
        { category: 'Brand Design', src: 'assets/Brand Design/Firmland Brand Design.pdf', title: 'Firmland Brand Design' },
        { category: 'Brand Design', src: 'assets/Brand Design/Task Pilot Mobile App.pdf', title: 'Task Pilot Brand Design' },
        
        // Graphic Design - Print Collaterals
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/NYE Banner.jpg', title: 'Heritage Hotel NYE Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Resized We care.jpg', title: 'We Care Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Resized We clean.jpg', title: 'We Clean Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Social-04.jpg', title: 'Room Web Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Social-03.jpg', title: 'Room Web Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Study 1.jpg', title: 'Riviera Resto Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Study 3.jpg', title: 'Riviera Resto Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Study 4.jpg', title: 'Riviera Resto Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Banner/Study 5.jpg', title: 'Riviera Resto Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Brochure/Xmas Brochure (back).jpg', title: 'Event Christmas Brochure' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Brochure/Xmas Brochure (front).jpg', title: 'Event Christmas Brochure' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Infrographic/Lifestyle Map.jpg', title: 'Map Infographic' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Infrographic/Safety Protocols tagalog.jpg', title: 'Safety Protocols Infographic' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Billboard/Banner Photo.png', title: 'Hotel Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Billboard/Hawker 2.jpg', title: 'Singapore Hawker Billboard Banner' },
        { category: 'Graphic Design-Print Collaterals', src: 'assets/Billboard/Hawker.jpg', title: 'Singapore Hawker Billboard Banner' },


        // Graphic Design - Large Scale Print
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale Print/Billboard Mockup 2.png', title: 'Heritage Hotel Billboard AD' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale Print/Banner mock up.png', title: 'Heritage Hotel Banner' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale Print/Billboard Mockup 3.png', title: 'Heritage Hotel Billboard AD' },
        { category: 'Graphic Design-Large Scale Print', src: 'assets/Large Scale Print/Billboard Mockup.png', title: 'Heritage Hotel Billboard AD' },

        // Logo Design
        { category: 'Logo Design', src: 'assets/Logos/FIG Logo 1.png', title: 'FIG Logo' },
        { category: 'Logo Design', src: 'assets/Logos/Paella.png', title: 'Paella Logo' },
        
        // Mobile UI/UX
        { category: 'Mobile UI/UX', src: 'assets/Mobile Application/Task Pilot Mobile App.pdf', title: 'Task Pilot Mobile App' },
        
        // Web UI/UX
        { category: 'Web UI/UX', src: 'assets/Web/Firmland landing page.pdf', title: 'Firmland Landing Page' },
        { category: 'Web UI/UX', src: 'assets/Web/Connext landing page.pdf', title: 'Connext Landing Page' },
        { category: 'Web UI/UX', src: 'assets/Web/SageAI landing page.pdf', title: 'SageAI Landing Page' },


        
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
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('portfolio-item');
            itemElement.dataset.src = item.src;
            itemElement.dataset.title = item.title;
            
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
                 itemElement.innerHTML = `<video src="${item.src}#t=0.5" muted preload="metadata"></video>`;
                 itemElement.addEventListener('click', openLightbox);
            } else {
                itemElement.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
                itemElement.addEventListener('click', openLightbox);
            }
            portfolioGrid.appendChild(itemElement);
        });
    }

    function openLightbox(e) {
        const item = e.currentTarget;
        const src = item.dataset.src;
        const type = src.split('.').pop().toLowerCase();

        if (type === 'mp4') {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = src;
        } else {
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = src;
        }
        modal.classList.add('active');
    }

    function closeTheModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = "";
    }

    closeModal.addEventListener('click', closeTheModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });
});

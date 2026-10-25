document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // ========== ФИЛЬТРАЦИЯ ==========
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ========== МОДАЛЬНОЕ ОКНО ==========
    const modal            = document.getElementById('artstation-modal');
    const closeBtn         = document.querySelector('.modal-close-btn');
    const modalGallery     = document.getElementById('modal-gallery');
    const modalTitle       = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTags        = document.getElementById('modal-tags');

    if (!modal || !closeBtn) return;

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title       = item.getAttribute('data-title');
            const desc        = item.getAttribute('data-desc');
            const tags        = item.getAttribute('data-tags');
            const imagesArray = item.getAttribute('data-images').split(',');

            modalTitle.textContent       = title;
            modalDescription.textContent = desc;
            modalTags.textContent        = tags;

            modalGallery.innerHTML = '';
            imagesArray.forEach(src => {
                const img = document.createElement('img');
                img.src = src.trim();
                img.alt = title;
                modalGallery.appendChild(img);
            });

            modal.style.display = 'block';
            modalGallery.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });
});

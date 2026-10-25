document.addEventListener('DOMContentLoaded', () => {
    
    // ЛОГИКА ФИЛЬТРАЦИИ ПОРТФОЛИО
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Переключаем активный класс у кнопок
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

    // ЛОГИКА МОДАЛЬНОГО ОКНА (ARTSTATION)
    const modal = document.getElementById('artstation-modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const modalGallery = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Собираем данные из дата-атрибутов кликнутой карточки
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const tags = item.getAttribute('data-tags');
            const imagesArray = item.getAttribute('data-images').split(',');

            // Заполняем текстовые поля в модалке
            modalTitle.textContent = title;
            modalDescription.textContent = desc;
            modalTags.textContent = tags;

            // Очищаем галерею от прошлых просмотров и рендерим новые картинки одна за одной
            modalGallery.innerHTML = '';
            imagesArray.forEach(imgSrc => {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc.trim();
                imgElement.alt = title;
                modalGallery.appendChild(imgElement);
            });

            // Показываем окно и блокируем прокрутку основного сайта
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие по клику на пустое пространство вокруг контента
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

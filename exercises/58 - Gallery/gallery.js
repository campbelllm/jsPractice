function Gallery(gallery) {
    if (!gallery) {
        throw new Error('No gallery found')
    }
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next')

    function showImage(el) {
        if (!el) {
            return;
        }
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent

    }


    images.forEach(image => image.addEventListener('click', e=> showImage(e.currentTarget)))
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

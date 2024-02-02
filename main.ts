namespace Grayscale { 
    let originalImages: { id: string, image: Image }[] = [];

    function storeOriginalImage(id: string, img: Image) {
        originalImages.push({ id: id, image: img.clone() });
    }

    function getOriginalImage(id: string): Image {
        for (let i = 0; i < originalImages.length; i++) {
            if (originalImages[i].id === id) {
                return originalImages[i].image;
            }
        }
        return null;
    }

    //% block="convert image to grayscale"
    function applyGrayscaleEffect(id: string, img: Image) {
        if (!getOriginalImage(id)) {
            storeOriginalImage(id, img.clone());
        }
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                const pixel = img.getPixel(x, y);
                const r = (pixel >> 16) & 0xff;
                const g = (pixel >> 8) & 0xff;
                const b = pixel & 0xff;
                const gray = (r * 0.3 + g * 0.59 + b * 0.11) | 0;
                img.setPixel(x, y, (gray << 16) | (gray << 8) | gray);
            }
        }
    }
}

export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: '../galeria/1.jpg',
                thumbnailImageSrc: '../galeria/1.jpg',
                alt: '',
                title: '1'
            },
            {
                itemImageSrc: '../galeria/5.jpg',
                thumbnailImageSrc: '../galeria/5.jpg',
                alt: 'Description for Image 2',
                title: '2'
            },
            {
                itemImageSrc: '../galeria/2.jpg',
                thumbnailImageSrc: '../galeria/2.jpg',
                alt: 'Description for Image 3',
                title: '3'
            },
            {
                itemImageSrc: '../galeria/3.jpg',
                thumbnailImageSrc: '../galeria/3.jpg',
                alt: 'Description for Image 4',
                title: '4'
            },
            {
                itemImageSrc: '../galeria/4.jpg',
                thumbnailImageSrc: '../galeria/4.jpg',
                alt: 'Description for Image 5',
                title: '5'
            }
        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};
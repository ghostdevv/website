import { getImage } from '@astrojs/image';

interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    format: InputFormat;
}

const images: Record<string, { default?: ImageMetadata }> = import.meta.glob(
    '../images/**/*',
    { eager: true },
);

export function getImageData(image: string) {
    const path = `../images/${image}`;
    return images[path]?.default || null;
}

export async function getImageSrc(name: string): Promise<string> {
    const src = getImageData(name);
    if (!src) throw new Error('unable to get image src');

    const image = await getImage({
        aspectRatio: 16 / 9,
        format: 'webp',
        alt: 'TODO',
        width: 1000,
        src,
    });

    return image.src!;
}

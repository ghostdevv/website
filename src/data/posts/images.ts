import type { ImageMetadata } from '@astrojs/image';
import { getImage } from '@astrojs/image';

const images: Record<string, { default: ImageMetadata }> = import.meta.glob(
    './images/**/*',
    { eager: true },
);

export function getImageData(image: string): ImageMetadata | undefined {
    return images[`./images/${image}`]?.default;
}

export async function getImageSrc(name: string): Promise<string> {
    const image = await getImage({
        src: getImageData(name)!,
        aspectRatio: 16 / 9,
        format: 'webp',
        width: 1000,
    });

    return image.src!;
}

export type Colour = [name: string, hex: string, textColour?: string];

export interface ColourGroup {
    title: string;
    colours: Colour[];
}

export const colours: ColourGroup[] = [
    {
        title: 'Primary',
        colours: [
            ['Primary', '#2160ec'],
            ['Secondary', '#437af1'],
        ],
    },
    {
        title: 'Backgrounds',
        colours: [
            ['BG Primary', '#121214'],
            ['BG Secondary', '#212123'],
            ['BG Tertiary', '#29292a'],
        ],
    },
    {
        title: 'Extras',
        colours: [
            ['Text', '#eee', '#000'],
            ['Green', '#67c157'],
            ['Red', '#f26c4b'],
            ['Orange', '#f29b4b'],
        ],
    },
];

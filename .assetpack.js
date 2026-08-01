import {pixiPipes} from '@assetpack/core/pixi';
export default {
    entry: './art/textures',
    output: './processed/textures',
    ignore: ['**/*.html', '**/*.bin', '**/*.json', '**/*.js','**.ts','**/*.tsx'],
    cache: true,
    cacheLocation: '.assetpack',
    pipes: [
        ...pixiPipes({
                cacheBust: false,
                compression: {png: true, webp: false},
                resolutions: [.25],
            },
        ),
    ],
};

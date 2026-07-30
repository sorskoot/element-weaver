import {NATURE_TILES} from './TileDefinitions.ts';
import {standardRules} from './StandardGameRules.ts';
import {GameDefinition} from '../types/GameDefinition.ts';
import {GROVE_LAYOUTS} from './LayoutDefinitions.ts';

export const DOMINO_GROVE: GameDefinition = {
    id: 'domino-grove',
    name: 'Domino Grove',
    defaultLayoutId: 'cozy-grove',
    defaultModeId: 'standard',
    tiles: NATURE_TILES,
    layouts: GROVE_LAYOUTS,
    modes: [
        {
            id: 'standard',
            name: 'Grove',
            description: 'Match three or more connected nature tiles.',
            rules: standardRules,
        },
    ],
};

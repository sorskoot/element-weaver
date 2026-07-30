import {GameModeDefinition} from './GameModeDefinition.ts';
import {TileDefinition} from './HexTile.ts';
import {LayoutDefinition} from './LayoutDefinition.ts';

export interface GameDefinition {
    id: string;
    name: string;
    defaultLayoutId: string;
    defaultModeId: string;
    tiles: readonly TileDefinition[];
    layouts: readonly LayoutDefinition[];
    modes: readonly GameModeDefinition[];
}

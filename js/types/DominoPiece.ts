import {Axial} from './Axial.ts';
import {TileId} from './HexTile.ts';

export interface TileInstance {
    id: number;
    kind: TileId;
}
export interface DominoPiece {
    id: number;
    first: TileId;
    second: TileId;
    direction: number;
}

export interface PlacedTile extends TileInstance, Axial {}

export interface MatchedGroup {
    cells: Axial[];
    kind: TileId;
    points: number;
    multiplier: number;
}

export interface PlacementResult {
    placed: PlacedTile[];
    matched: MatchedGroup[];
    gained: number;
    combo: number;
    cleared: boolean;
    gameOver: boolean;
    wasDouble: boolean;
}

export interface PlacementPreview {
    anchor: Axial;
    valid: boolean;
    flipped: boolean;
}

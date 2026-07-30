import {Six} from './Six.ts';

export type TileId = string;

export interface TileDefinition {
    id: TileId;
    name: string;
    prefab: string;
}

export interface WeightedTile {
    id: TileId;
    weight: number;
}

type HexTileBase = {
    id: TileId;
    type: TileType;
};

export type HexTilePiece = HexTileBase & {
    type: TileType.piece;
    //readonly elements: Six<TileElementType>;
    tileId: TileId;
    rotation: number;
};

export type HexTilePlaceholder = HexTileBase & {
    type: TileType.placeholder;
};

export type HexTileElements = HexTilePiece | HexTilePlaceholder;

export enum TileType {
    placeholder = 'placeholder',
    piece = 'piece',
}

export enum TileElementType {
    fire = 'fire',
    water = 'water',
    earth = 'earth',
    air = 'air',
    spirit = 'spirit',
}

import {HexagonTile} from '../classes/HexagonTile.ts';
import {HexagonGrid} from '../classes/HexGrid.ts';
import {HexTileElements, HexTilePlaceholder, TileType} from '../types/HexTile.ts';

export class GameModel {
    private grid: HexagonGrid;
    private placeholderGrid: HexagonGrid;

    tileData: Map<string, HexTileElements> = new Map();

    constructor() {
        this.grid = new HexagonGrid();
        this.placeholderGrid = new HexagonGrid();
    }

    clearGrid(): void {
        this.grid.clear();
        this.tileData.clear();
    }

    getAllTiles(): HexagonTile[] {
        return this.grid.getAllTiles();
    }

    getAllPlaceholderTiles(): HexagonTile[] {
        return this.placeholderGrid.getAllTiles();
    }

    getTileAt(x: number, y: number, z: number): HexagonTile | undefined {
        return this.grid.getTile(x, y, z);
    }

    getPlaceholderAt(x: number, y: number, z: number): HexagonTile | undefined {
        return this.placeholderGrid.getTile(x, y, z);
    }

    getTileById(tileId: string): HexagonTile | undefined {
        return this.grid.getTileById(tileId);
    }

    public getPlaceholderById(tileId: string): HexagonTile | undefined {
        return this.placeholderGrid.getTileById(tileId);
    }

    getTileDataById(tileId: string): HexTileElements | undefined {
        return this.tileData.get(tileId);
    }

    public addPlaceholderTile(x: number, y: number, z: number): string {
        const newTile = new HexagonTile(x, y, z, TileType.placeholder);
        this.placeholderGrid.addTile(newTile);
        return newTile.id;
    }

    public addTile(x: number, y: number, z: number, elements: HexTileElements): string {
        const newTile = new HexagonTile(x, y, z, elements.type);
        this.grid.addTile(newTile);
        if (elements && elements.type === TileType.piece) {
            this.tileData.set(newTile.id, elements);
        }
        return newTile.id;
    }

    public removeTile(tileId: string): void {
        const tile = this.grid.getTileById(tileId);
        if (tile) {
            //this.grid.removeTile(tile.x, tile.y, tile.z);
            this.tileData.delete(tileId);
        }
    }
}

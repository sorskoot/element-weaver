import {HexagonTile} from '../classes/HexagonTile.ts';
import {HexagonGrid} from '../classes/HexGrid.ts';
import {HexTileElements, TileType} from '../types/HexTile.ts';

export class GameModel {
    private grid: HexagonGrid;

    tileData: Map<string, HexTileElements> = new Map();

    constructor() {
        this.grid = new HexagonGrid();
    }

    clearGrid(): void {
        this.grid.clear();
        this.tileData.clear();
    }

    getAllTiles(): HexagonTile[] {
        return this.grid.getAllTiles();
    }

    getTileAt(x: number, y: number, z: number): HexagonTile | undefined {
        return this.grid.getTile(x, y, z);
    }

    getTileById(tileId: string): HexagonTile | undefined {
        return this.grid.getTileById(tileId);
    }
    getTileDataById(tileId: string): HexTileElements | undefined {
        return this.tileData.get(tileId);
    }

    addTile(x: number, y: number, z: number, elements: HexTileElements): string {
        const newTile = new HexagonTile(x, y, z, elements.type);
        this.grid.addTile(newTile);
        if (elements && elements.type === TileType.piece) {
            this.tileData.set(newTile.id, elements);
        }
        return newTile.id;
    }
}

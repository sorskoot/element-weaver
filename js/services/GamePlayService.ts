import {HexagonTile} from '../classes/HexagonTile.ts';
import {GameModel} from '../models/GameModel.ts';
import {DominoPiece} from '../types/DominoPiece.ts';
import {HexTileElements, TileId, TileType} from '../types/HexTile.ts';
import {Point2D} from '../types/Points.ts';
import {EventEmitter} from '../utils/Events.ts';
import {DominoService} from './DominoService.ts';
import {ScoreService} from './ScoreService.ts';

export class GamePlayService {
    onNewGame = new EventEmitter<[]>();
    onTilesChanged = new EventEmitter<[TileId[]]>();
    onTilesRemoved = new EventEmitter<[TileId[]]>();
    onTileRotated = new EventEmitter<[DominoPiece]>();
    onTilePreviewChanged = new EventEmitter<[DominoPiece, DominoPiece]>();
    onPlaceholdersUpdated = new EventEmitter<[]>();

    //private nextTile?: HexTilePiece;
    private currentPiece: DominoPiece;
    private nextPiece: DominoPiece;

    constructor(
        private dominoService: DominoService,
        private scoreService: ScoreService,
        private gameModel: GameModel,
    ) {
        this.currentPiece = dominoService.nextPiece();
        this.nextPiece = dominoService.nextPiece();
    }

    newGame(): void {
        console.log('Starting a new game...');
        this.gameModel.clearGrid();
        this.onNewGame.emit();

        const changedTileIds: string[] = [];
        // Add a placeholder tile to the center of the grid
        const addedTileId = this.gameModel.addPlaceholderTile(0, 0, 0);
        changedTileIds.push(addedTileId);

        // surround the center tile with 6 placeholder tiles
        this.surroundWithPlaceholders();
        this.surroundWithPlaceholders();
        this.surroundWithPlaceholders();

        this.onPlaceholdersUpdated.emit();

        //this.createNextTilePreview();
        this.currentPiece = this.dominoService.nextPiece();
        this.nextPiece = this.dominoService.nextPiece();
        this.onTilePreviewChanged.emit(this.currentPiece, this.nextPiece);
    }

    public getAllPlaceholderTiles(): HexagonTile[] {
        return this.gameModel.getAllPlaceholderTiles();
    }

    public getTilePositions(placeHolderId: TileId): [Point2D, Point2D] | undefined {
        const tile = this.getPlaceholder(placeHolderId);
        if (!tile) {
            throw new Error(`Placeholder tile with ID ${placeHolderId} not found.`);
        }
        const p2 = tile.neighbors()[this.currentPiece.direction];
        const tile2 = this.gameModel.getPlaceholderAt(p2.x, p2.y, p2.z);
        if (!tile2) {
            return;
        }
        return [
            tile.to2D(),
            tile2.to2D(),
        ];
    }

    getPlaceholder(tileId: string): HexagonTile | undefined {
        return this.gameModel.getPlaceholderById(tileId);
    }

    getTile(tileId: string): HexagonTile | undefined {
        return this.gameModel.getTileById(tileId);
    }

    placeTile(tile: HexagonTile): void {
        // if(!this.canPlace(tile)){
        //     return;
        // }
        // const existingTile = this.gameModel.getTileById(tile.id);
        // if (existingTile && existingTile.type === TileType.placeholder) {
        // const rotatedElements = this.elementDistributionService.rotateElements(
        //     this.nextTile!.elements,
        //     this.nextTile!.rotation
        // );
        const id1 = this.gameModel.addTile(tile.x, tile.y, tile.z, {
            id:       `${tile.x},${tile.y},${tile.z}`,
            type:     TileType.piece,
            tileId:   this.currentPiece.first,
            rotation: this.currentPiece.direction,
        });

        //TK: Figure out a way to find which neighbor is with a rotation
        const tile2Pos = tile.neighbors()[this.currentPiece.direction];

        const id2 = this.gameModel.addTile(tile2Pos.x, tile2Pos.y, tile2Pos.z, {
            id:       `${tile2Pos.x},${tile2Pos.y},${tile2Pos.z}`,
            type:     TileType.piece,
            tileId:   this.currentPiece.second,
            rotation: this.currentPiece.direction,
        });

        const changedTileIds: string[] = [id1, id2];
        // surround the newly placed tile with placeholder tiles if empty spots exist
        //  const addedPlaceholderIds = this.surroundWithPlaceholders();
        // changedTileIds.push(...addedPlaceholderIds);
        this.onTilesChanged.emit(changedTileIds);

        this.checkPlacedDomino(id1, id2);

        this.currentPiece = this.nextPiece;
        this.nextPiece = this.dominoService.nextPiece();
        this.onTilePreviewChanged.emit(this.currentPiece, this.nextPiece);
        //   }
    }

    getTileDataById(tileId: string): HexTileElements | undefined {
        return this.gameModel.getTileDataById(tileId);
    }

    rotatePreviewTileCounterClockwise(): void {
        if (this.currentPiece) {
            this.currentPiece.direction = (this.currentPiece.direction + 1) % 6;
            this.onTileRotated.emit(this.currentPiece);
        }
    }

    rotatePreviewTileClockwise(): void {
        if (this.currentPiece) {
            this.currentPiece.direction = (this.currentPiece.direction + 5) % 6;
            this.onTileRotated.emit(this.currentPiece);
        }
    }

    /**`
     * Surrounds all piece tiles with placeholder tiles if empty spots exist.
     * @returns An array of IDs of the added placeholder tiles.
     */
    private surroundWithPlaceholders() {
        const allTiles = this.gameModel.getAllPlaceholderTiles();
        for (const tile of allTiles) {
            const neighbors = tile.neighbors();
            //  if (tile.type === TileType.piece) {
            // if the tile is a piece, check its neighbors and
            // add placeholder tiles if they don't exist
            for (const neighbor of neighbors) {
                const neighborTile = this.gameModel.getTileAt(neighbor.x, neighbor.y, neighbor.z);
                if (!neighborTile) {
                    // there's an empty spot next to a tile,
                    // so we should add a placeholder tile there
                    this.gameModel.addPlaceholderTile(neighbor.x, neighbor.y, neighbor.z);
                    // addedTileIds.push(addedTileId);
                }
                //   }
            }
        }
        //return addedTileIds;
    }

    private checkPlacedDomino(hexTileAId: string, hexTileBId: string) {
        const hexTileA = this.gameModel.getTileById(hexTileAId)!;
        const hexTileB = this.gameModel.getTileById(hexTileBId)!;
        const visited = new Set<string>();
        const data1 = this.gameModel.getTileDataById(hexTileAId);
        if (data1?.type !== TileType.piece) {
            throw new Error(`Tile ${hexTileAId} is not a piece tile.`);
        }
        const data2 = this.gameModel.getTileDataById(hexTileBId);
        if (data2?.type !== TileType.piece) {
            throw new Error(`Tile ${hexTileBId} is not a piece tile.`);
        }

        const totalMatches = this.collectMatchingGroup(hexTileA, visited, data1.tileId);
        if(totalMatches.length >= 3){
            this.handleMatch(totalMatches);
        }
        if (data1.tileId !== data2.tileId) {
            // tiles in domino are different. We'll have to check the other one too
            const totalMatchesB = this.collectMatchingGroup(hexTileB, visited, data2.tileId);
            if(totalMatchesB.length >= 3) {
                this.handleMatch(totalMatchesB);
            }
        }
    }

    private collectMatchingGroup(startTile: HexagonTile, checkedInstanceIds: Set<string>, definitionId: TileId): string[] {
        const groupInstanceIds: string[] = [];
        const pendingTiles: HexagonTile[] = [startTile];
        while (pendingTiles.length > 0) {
            const tile = pendingTiles.pop();
            if (!tile || checkedInstanceIds.has(tile.id)) {
                continue;
            }

            const tileData = this.gameModel.getTileDataById(tile.id);

            if (
                !tileData ||
                tileData.type !== TileType.piece ||
                tileData.tileId !== definitionId
            ) {
                continue;
            }

            checkedInstanceIds.add(tile.id);
            groupInstanceIds.push(tile.id);

            for (const neighborPosition of tile.neighbors()) {
                const neighborTile = this.gameModel.getTileAt(
                    neighborPosition.x,
                    neighborPosition.y,
                    neighborPosition.z,
                );

                if (
                    neighborTile &&
                    !checkedInstanceIds.has(neighborTile.id) &&
                    neighborTile.type === TileType.piece
                ) {
                    pendingTiles.push(neighborTile);
                }
            }
        }

        return groupInstanceIds;

        /*
            How to check matches?
            - There's only 2 tiles placed. We should only have to check the neighbors of these
            - If a neighbor is the same type, step deeper and check its neighbors.
            - If a neighbor is a different type, stop checking that path.

            if I pass an array to a function, is that by reference?
            So if I would pass an array of checked tiles to a function, and that function would add a tile to that
            array, would the original array be updated as well?
         */
    }

    private canPlace(tile: HexagonTile): boolean {
        let spot1 = false;
        let spot2 = false;
        const existingTile = this.gameModel.getTileAt(tile.x, tile.y, tile.z);
        if (!existingTile) {
            spot1 = true;
        }

        // calculate second tile location

        return spot1 && spot2;
    }

    private handleMatch(matches: string[]): void {
        // remove them
        for (const tile of matches) {
            this.gameModel.removeTile(tile);
        }
        this.onTilesRemoved.emit(matches);
    }
}

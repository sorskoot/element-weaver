import {rng} from '@sorskoot/wonderland-components';
import {HexagonTile} from '../classes/HexagonTile.ts';
import {NATURE_TILES} from '../config/TileDefinitions.ts';
import {GameModel} from '../models/GameModel.ts';
import {DominoPiece} from '../types/DominoPiece.ts';
import {HexTileElements, HexTilePiece, TileId, TileType} from '../types/HexTile.ts';
import {EventEmitter} from '../utils/Events.ts';
import {DominoService} from './DominoService.ts';
import {ElementDistributionService} from './ElementDistributionService.ts';
import {ScoreService} from './ScoreService.ts';

export class GamePlayService {
    onNewGame = new EventEmitter<[]>();
    onTilesChanged = new EventEmitter<[TileId[]]>();
    onTilePreviewChanged = new EventEmitter<[DominoPiece,DominoPiece]>();
    onPlaceholdersUpdated = new EventEmitter<[]>();

    //private nextTile?: HexTilePiece;
    private currentPiece: DominoPiece;
    private nextPiece: DominoPiece;

    constructor(
        private dominoService: DominoService,
        private scoreService: ScoreService,
        private gameModel: GameModel
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
        this.onTilePreviewChanged.emit(this.currentPiece, this.nextPiece)
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
    public getAllPlaceholderTiles(): HexagonTile[] {
        return this.gameModel.getAllPlaceholderTiles();
    }

    getTile(tileId: string): HexagonTile | undefined {
        return this.gameModel.getTileById(tileId);
    }

    placeTile(tile: HexagonTile): void {
        const existingTile = this.gameModel.getTileById(tile.id);
        if (existingTile && existingTile.type === TileType.placeholder) {
            // const rotatedElements = this.elementDistributionService.rotateElements(
            //     this.nextTile!.elements,
            //     this.nextTile!.rotation
            // );
            const id1 = this.gameModel.addTile(tile.x, tile.y, tile.z, {
                id: `${tile.x},${tile.y},${tile.z}`,
                type: TileType.piece,
                tileId: this.currentPiece.first,
                rotation: this.currentPiece.direction,
            });
            const x2D = 1 * Math.sqrt(3) * (1 + -1 / 2);
            const y2D = 1 * (3 / 2) * -1;

            const tile2Pos = tile.neighbors()[0];



            const id2= this.gameModel.addTile(tile2Pos.x, tile2Pos.y, tile2Pos.z, {
                id: `${tile2Pos.x},${tile2Pos.y},${tile2Pos.z}`,
                type: TileType.piece,
                tileId: this.currentPiece.second,
                rotation: this.currentPiece.direction,
            });

            //this.checkMatches(tile.id);
            const changedTileIds: string[] = [id1,id2];
            // surround the newly placed tile with placeholder tiles if empty spots exist
            //  const addedPlaceholderIds = this.surroundWithPlaceholders();
            // changedTileIds.push(...addedPlaceholderIds);
            this.onTilesChanged.emit(changedTileIds);

            this.currentPiece = this.nextPiece;
            this.nextPiece = this.dominoService.nextPiece();
            this.onTilePreviewChanged.emit(this.currentPiece, this.nextPiece)
        }
    }

    getTileDataById(tileId: string): HexTileElements | undefined {
        return this.gameModel.getTileDataById(tileId);
    }


    rotatePreviewTileCounterClockwise(): void {
        // if (this.nextTile && this.nextTile.type === TileType.piece) {
        //     this.nextTile.rotation = (this.nextTile.rotation + 5) % 6;
        //     this.onTilePreviewChanged.emit(this.nextTile);
        // }
    }

    rotatePreviewTileClockwise(): void {
        // if (this.nextTile && this.nextTile.type === TileType.piece) {
        //     this.nextTile.rotation = (this.nextTile.rotation + 1) % 6;
        //     this.onTilePreviewChanged.emit(this.nextTile);
        // }
    }

    private checkMatches(tileId: string): void {
        // const placedTile = this.gameModel.getTileById(tileId);
        // if (!placedTile || placedTile.type !== TileType.piece) {
        //     return;
        // }
        // const placedTileData = this.gameModel.getTileDataById(placedTile.id);
        // if (!placedTileData || placedTileData.type !== TileType.piece) {
        //     return;
        // }
        // const neighbors = placedTile.neighbors();
        // let spirit = false;
        // const matchingNeighbors: HexagonTile[] = [];
        // for (let i = 0; i < 6; i++) {
        //     const neighbor = neighbors[i];
        //     const neighborTile = this.gameModel.getTileAt(neighbor.x, neighbor.y, neighbor.z);
        //     if (neighborTile && neighborTile.type === TileType.piece) {
        //         const neighborTileData = this.gameModel.getTileDataById(neighborTile.id);
        //         if (neighborTileData && placedTileData && neighborTileData.type === TileType.piece) {
        //             const placedElement = placedTileData.elements[i];
        //             const neighborElement = neighborTileData.elements[(i + 3) % 6];
        //             if (placedElement === neighborElement) {
        //                 matchingNeighbors.push(neighborTile);
        //             } else if (placedElement === 'spirit' || neighborElement === 'spirit') {
        //                 // TODO: Track special case.
        //                 spirit = true;
        //                 // matchingNeighbors.push(neighborTile);
        //             }
        //         }
        //     }
        // }
        // this.scoreService.addScore(matchingNeighbors.length, spirit);
        // console.log(`Matching neighbors:`, matchingNeighbors.length);
    }
}

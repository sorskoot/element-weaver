import {rng} from '@sorskoot/wonderland-components';
import {HexagonTile} from '../classes/HexagonTile.ts';
import {NATURE_TILES} from '../config/TileDefinitions.ts';
import {GameModel} from '../models/GameModel.ts';
import {DominoPiece} from '../types/DominoPiece.ts';
import {HexTileElements, HexTilePiece, TileId, TileType} from '../types/HexTile.ts';
import {Point2D, Point3D} from '../types/Points.ts';
import {EventEmitter} from '../utils/Events.ts';
import {DominoService} from './DominoService.ts';
import {ElementDistributionService} from './ElementDistributionService.ts';
import {ScoreService} from './ScoreService.ts';

export class GamePlayService {
    onNewGame = new EventEmitter<[]>();
    onTilesChanged = new EventEmitter<[TileId[]]>();
    onTileRotated = new EventEmitter<[DominoPiece]>();
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

    public getTilePositions(placeHolderId:TileId):[Point2D, Point2D] | undefined {
        const tile = this.getPlaceholder(placeHolderId);
        if (!tile) {
            throw new Error(`Placeholder tile with ID ${placeHolderId} not found.`);
        }
        const p2 = tile.neighbors()[this.currentPiece.direction];
        const tile2 = this.gameModel.getPlaceholderAt(p2.x,p2.y,p2.z);
        if (!tile2) {
            return;
        }
        return [
            tile.to2D(),
            tile2.to2D(),
        ]
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
                id: `${tile.x},${tile.y},${tile.z}`,
                type: TileType.piece,
                tileId: this.currentPiece.first,
                rotation: this.currentPiece.direction,
            });

            //TK: Figure out a way to find which neighbor is with a rotation
            const tile2Pos = tile.neighbors()[this.currentPiece.direction];

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
}

import {ReadonlySignal, Signal, signal} from '@preact/signals-core';
import {HexagonTile} from '../classes/HexagonTile.ts';
import {EventEmitter} from '../utils/Events.ts';
import {GamePlayService} from './GamePlayService.ts';

export class TileInteractionService {
    onTileHover = new EventEmitter<[string, {x: number; y: number}, HexagonTile]>();
    onTileClick = new EventEmitter<[string, {x: number; y: number}, HexagonTile]>();
    onTileUnhover = new EventEmitter<[string]>();
    currentHoveredTile: Signal<HexagonTile | null> = signal(null);

    constructor(private gamePlayService: GamePlayService) {}

    emitTileHover(tileId: string): void {
        const tile = this.gamePlayService.getTile(tileId);
        const tilePos = tile?.to2D();
        if (tilePos && tile) {
            this.onTileHover.emit(tileId, tilePos, tile);
            this.currentHoveredTile.value = tile;
        } else {
            this.currentHoveredTile.value = null;
        }
    }

    emitTileClick(tileId: string): void {
        const tile = this.gamePlayService.getTile(tileId);
        const tilePos = tile?.to2D();
        if (tilePos && tile) {
            this.onTileClick.emit(tileId, tilePos, tile);
            this.currentHoveredTile.value = null;
            this.currentHoveredTile.value = tile;
        }
    }

    emitTileUnhover(tileId: string): void {
        this.onTileUnhover.emit(tileId);
        this.currentHoveredTile.value = null;
    }
}

import {TileId} from '../types/HexTile.ts';
import {Point3D} from '../types/Points.ts';
import {GamePlayService} from './GamePlayService.ts';
import {TileInteractionService} from './TileInteractionService.ts';


export class TilePlayService {
    constructor(
        private gamePlayService: GamePlayService,
        private tileInteractionService: TileInteractionService
    ) {
        this.tileInteractionService.onTileClick.add(this.onTileClick);
    }

    private onTileClick = (tileId: TileId): void => {
        const tile = this.gamePlayService.getPlaceholder(tileId);
        if (tile) {
            this.gamePlayService.placeTile(tile);
        }
    };
}

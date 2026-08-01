import {GamePlayService} from './GamePlayService.ts';
import {TileInteractionService} from './TileInteractionService.ts';


export class TilePlayService {
    constructor(
        private gamePlayService: GamePlayService,
        private tileInteractionService: TileInteractionService
    ) {
        this.tileInteractionService.onTileClick.add(this.onTileClick);
    }

    private onTileClick = (tileId: string): void => {
        const tile = this.gamePlayService.getTile(tileId);
        if (tile) {
            this.gamePlayService.placeTile(tile);
        }
    };
}

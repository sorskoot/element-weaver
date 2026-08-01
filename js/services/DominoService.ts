import {rng} from '@sorskoot/wonderland-components';
import {DominoPiece} from '../types/DominoPiece.ts';
import {TileId} from '../types/HexTile.ts';
import {RulesService} from './RulesService.ts';

export class DominoService {
    private id: number = 1;

    constructor(private rulesService: RulesService) {
    }

    nextPiece(): DominoPiece {
        const first = this.pickTile();
        const second = rng.getUniform() < this.rulesService.doubleChance ? first : this.pickTile();

        return {
            id:        this.id,
            first,
            second,
            direction: rng.getUniformInt(0, 5),
        };
    }

    private pickTile(): TileId {
        const total = this.rulesService.tilePool.reduce((sum, entry) => sum + entry.weight, 0);
        let cursor = rng.getUniform() * total;
        for (const entry of this.rulesService.tilePool) {
            cursor -= entry.weight;
            if (cursor <= 0) {
                return entry.id;
            }
        }
        return this.rulesService.tilePool[this.rulesService.tilePool.length - 1].id;
    }
}

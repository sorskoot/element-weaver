import {GameRulesConfig} from '../types/GameRulesConfig.ts';
import {NATURE_TILES} from './TileDefinitions.ts';

export const standardRules: GameRulesConfig = {
    matchSize: 3,
    doubleChance: 0.24,
    tilePool: NATURE_TILES.map((tile) => ({id: tile.id, weight: 1})),
    scoring: {
        placement: 10,
        perMatchedTile: 20,
        largeMatchStartsAt: 5,
        largeMatchBonusPerTile: 50,
        clearBoardBonus: 300,
    },
    timing: {
        placementLockMs: 160,
        matchBaseLockMs: 380,
        matchComboLockMs: 200,
        maxMatchLockMs: 900,
        gameOverDelayMs: 1000,
    },
};

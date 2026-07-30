import {GameRulesConfig} from './GameRulesConfig.ts';

export interface GameModeDefinition {
    id: string;
    name: string;
    description: string;
    rules: GameRulesConfig;
}

import {standardRules} from '../config/StandardGameRules.ts';
import {GameRulesConfig} from '../types/GameRulesConfig.ts';
import {WeightedTile} from '../types/HexTile.ts';

export class RulesService  {
    private rules: GameRulesConfig;

    public get doubleChance(): number {
        return this.rules.doubleChance;
    }

    public get tilePool(): readonly WeightedTile[] {
        return this.rules.tilePool;
    }

    constructor(){
        //TK: At some point we might use different sets of rules, for now we hardcode to the standard rules
        this.rules = standardRules;
    }
}

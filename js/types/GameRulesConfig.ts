import { WeightedTile } from "./HexTile.ts";
import { ScoringConfig } from "./ScoringConfig.ts";
import { TimingConfig } from "./TimingConfig.ts";

export interface GameRulesConfig {
  matchSize: number;
  doubleChance: number;
  tilePool: readonly WeightedTile[];
  scoring: ScoringConfig;
  timing: TimingConfig;
}

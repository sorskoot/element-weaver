import {DominoService} from './services/DominoService.ts';
import {RulesService} from './services/RulesService.ts';
import {serviceLocator} from './utils/ServiceLocator.ts';
import {GameModel} from './models/GameModel.ts';
import {ConfigModel} from './models/ConfigModel.ts';
import {ConfigService} from './services/ConfigService.ts';
import {GamePlayService} from './services/GamePlayService.ts';
import {GameFlowService} from './services/GameFlowService.ts';
import {TileInteractionService} from './services/TileInteractionService.ts';
import {TilePlayService} from './services/TilePlayService.ts';
import {ElementDistributionService} from './services/ElementDistributionService.ts';
import {ScoreService} from './services/ScoreService.ts';

const gameModel = new GameModel();
const configModel = new ConfigModel();
const configService = new ConfigService(configModel);
const elementDistributionService = new ElementDistributionService();
const scoreService = new ScoreService();
const rulesService = new RulesService();
const dominoService = new DominoService(rulesService);
const gamePlayService = new GamePlayService(dominoService, scoreService, gameModel);
const gameFlowService = new GameFlowService(gamePlayService);
const tileInteractionService = new TileInteractionService(gamePlayService);
const tilePlayService = new TilePlayService(gamePlayService, tileInteractionService);

export function registerServices(): void {
    // Models
    serviceLocator.registerSingleton(ConfigModel, configModel);
    serviceLocator.registerSingleton(GameModel, gameModel);
    // Services
    serviceLocator.registerSingleton(ConfigService, configService);
    serviceLocator.registerSingleton(GamePlayService, gamePlayService);
    serviceLocator.registerSingleton(GameFlowService, gameFlowService);
    serviceLocator.registerSingleton(TileInteractionService, tileInteractionService);
    serviceLocator.registerSingleton(TilePlayService, tilePlayService);
    serviceLocator.registerSingleton(ElementDistributionService, elementDistributionService);
    serviceLocator.registerSingleton(ScoreService, scoreService);
    serviceLocator.registerSingleton(RulesService, rulesService);
    serviceLocator.registerSingleton(DominoService, dominoService);
}

export {
    configService,
    gamePlayService,
    gameFlowService,
    tileInteractionService,
    tilePlayService,
    elementDistributionService,
    scoreService,
};

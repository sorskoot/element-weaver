import {ReadonlySignal, signal} from '@preact/signals-core';
import {IGamePlayService} from './GamePlayService.ts';

export enum GameState {
    TitleScreen = 'title-screen',
    Menu = 'menu',
    Playing = 'playing',
    Paused = 'paused',
    GameOver = 'game-over',
}

export class GameFlowService {
    gameState = signal<GameState>(GameState.Menu);
    constructor(private gamePlayService: IGamePlayService) {}

    startGame(): void {
        this.gamePlayService.newGame();
        this.gameState.value = GameState.Playing;
    }
}

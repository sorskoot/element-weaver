import React, {createContext, useContext} from 'react';
import {GameFlowService} from '../services/GameFlowService.ts';
import {GamePlayService} from '../services/GamePlayService.ts';
import {ScoreService} from '../services/ScoreService.ts';

export interface GameServices {
    gameFlowService: GameFlowService;
    gamePlayService: GamePlayService;
    scoreService: ScoreService;
}

const GameServicesContext = createContext<GameServices | null>(null);

export interface GameServicesProviderProps {
    services: GameServices;
    children: React.ReactNode;
}

export function GameServicesProvider(props: GameServicesProviderProps) {
    return <GameServicesContext.Provider value={props.services}>{props.children}</GameServicesContext.Provider>;
}

export function useGameServices(): GameServices {
    const services = useContext(GameServicesContext);

    if (!services) {
        throw new Error('useGameServices must be used inside GameServicesProvider');
    }

    return services;
}

// Convenience exports for the services
export function useGameFlowService() {
    return useGameServices().gameFlowService;
}

export function useGamePlayService() {
    return useGameServices().gamePlayService;
}

export function useScoreService() {
    return useGameServices().scoreService;
}

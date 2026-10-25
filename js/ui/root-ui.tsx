import {Align, Justify, ReactUiBase} from '@wonderlandengine/react-ui';
import {property} from '@wonderlandengine/api/decorators.js';
import {Panel, MaterialContext, Container} from '@wonderlandengine/react-ui/components';
import {Hud} from './components/hud/hud.tsx';
import {MenuThemeContext, MenuThemeContextValue} from './utils/menu-theme-context.js';
import {colorSwatch} from './utils/colorSwatch.ts';
import {useSignalValue} from './hooks/useSignalValue.ts';
import {GameServicesProvider, useGameFlowService} from './GameServicesProvider.tsx';
import {gameFlowService, gamePlayService, scoreService} from '../bootstrap-services.ts';
import {MainMenu} from './components/main-menu/mainMenu.tsx';
import {GameState} from '../services/GameFlowService.ts';
import {Component, Object3D} from '@wonderlandengine/api';

const App = (props: {comp: MainMenuRootUI}) => {
    const gameFlowService = useGameFlowService();

    const gameState = useSignalValue(gameFlowService.gameState);

    const DefaultTheme: MenuThemeContextValue = {
        panel: {
            rounding: 0,
            borderSize: 0,
            padding: 16,
            backgroundColor: colorSwatch.PanelBackground,
        },
        button: {
            rounding: 0,
            width: 120,
            height: 40,
        },
        mainMenuButtonText: {
            fontSize: 10,
        },
    };

    const comp = props.comp;

    return (
        <MaterialContext.Provider value={comp}>
            <MenuThemeContext.Provider value={DefaultTheme}>
                <Container
                    width={comp.width}
                    height={comp.height}
                    justifyContent={Justify.Center}
                    alignItems={Align.Center}
                >
                    {gameState === GameState.Menu && <MainMenu />}
                    {gameState === GameState.Playing && <Hud />}
                </Container>
            </MenuThemeContext.Provider>
        </MaterialContext.Provider>
    );
};

export class MainMenuRootUI extends ReactUiBase {
    static TypeName = 'main-menu-root-ui';
    static InheritProperties = true;

    @property.int(1000)
    public override width = 1000;

    @property.int(1000)
    public override height = 1000;

    private unsubscribeGameState: (() => void) | null = null;
    private hiddenComponents: Map<Component, boolean> | null = null;

    public override async start() {
        await super.start();
        if (this.isDestroyed) {
            return;
        }
        super.update();
        this.unsubscribeGameState = gameFlowService.gameState.subscribe((state) => {
            this.setUiVisible(state === GameState.Menu || state === GameState.Playing);
        });
    }

    private setUiVisible(visible: boolean): void {
        if (visible) {
            const components = this.hiddenComponents;
            this.hiddenComponents = null;
            components?.forEach((active, component) => {
                if (!component.isDestroyed) {
                    component.active = active;
                }
            });
            return;
        }
        if (this.hiddenComponents) {
            return;
        }
        const components = new Map<Component, boolean>();
        const collectComponents = (object: Object3D): void => {
            for (const component of object.getComponents()) {
                components.set(component, component.active);
            }
            for (const child of object.children) {
                collectComponents(child);
            }
        };
        collectComponents(this.object);
        this.hiddenComponents = components;
        components.forEach((active, component) => {
            if (active && !component.isDestroyed) {
                component.active = false;
            }
        });
    }

    public override onDestroy(): void {
        this.unsubscribeGameState?.();
        this.unsubscribeGameState = null;
        this.hiddenComponents = null;
        super.onDestroy();
    }

    override update(dt: number) {
        super.update();
    }

    //TK: Somehow add an event listener or something to completely disable this UI component when needed.

    render() {
        return (
            <GameServicesProvider
                services={{
                    gameFlowService,
                    gamePlayService,
                    scoreService,
                }}
            >
                <App comp={this} />
            </GameServicesProvider>
        );
    }
}

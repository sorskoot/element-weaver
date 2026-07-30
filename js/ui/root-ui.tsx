import {Align, Justify, ReactUiBase} from '@wonderlandengine/react-ui';
import {Panel, MaterialContext, Container} from '@wonderlandengine/react-ui/components';
import {Hud} from './components/hud/hud.tsx';
import {MenuThemeContext, MenuThemeContextValue} from './utils/menu-theme-context.js';
import {colorSwatch} from './utils/colorSwatch.ts';
import {useSignalValue} from './hooks/useSignalValue.ts';
import {GameServicesProvider, useGameFlowService} from './GameServicesProvider.tsx';
import {gameFlowService, gamePlayService, scoreService} from '../bootstrap-services.ts';
import {MainMenu} from './components/main-menu/mainMenu.tsx';
import {GameState} from '../services/GameFlowService.ts';
import {wlUtils} from '@sorskoot/wonderland-components';

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
                <Container width={1000} height={1000} justifyContent={Justify.Center} alignItems={Align.Center}>
                    <MainMenu />
                    {/* {gameState === GameState.Playing && <Hud />} */}
                    {/* {gameState === GameState.Playing && <Ingame />} */}
                </Container>
            </MenuThemeContext.Provider>
        </MaterialContext.Provider>
    );
};

export class MainMenuRootUI extends ReactUiBase {
    static TypeName = 'main-menu-root-ui';
    static InheritProperties = true;

    override async start() {
        gameFlowService.gameState.subscribe((state) => {
            if (state === GameState.Menu) {
                wlUtils.setActive(this.object, true);
            } else {
                wlUtils.setActive(this.object, false);
            }
        });
        return super.start();
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

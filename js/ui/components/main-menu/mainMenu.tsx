import {Column, Panel, Row, Text} from '@wonderlandengine/react-ui/components';
import {Align, Justify} from '@wonderlandengine/react-ui';
import {colorSwatch} from '../../utils/colorSwatch.ts';
import {useMenuViewModel} from './useMenuViewModel.ts';

export const MainMenu = () => {
    const vm = useMenuViewModel();

    return (
        <Column gap={10} width="100%" height="100%" justifyContent={Justify.Center} alignItems={Align.Center}>
            <Text fontSize={32} color={colorSwatch.Text}>
                -=[ Element Weaver ]=-
            </Text>
            <Panel
                onClick={vm.play}
                height={100}
                width={100}
                rounding={1}
                backgroundColor={colorSwatch.MainButton}
                justifyContent={Justify.Center}
                alignItems={Align.Center}
            >
                <Text fontSize={16}>Play</Text>
            </Panel>
        </Column>
    );
};

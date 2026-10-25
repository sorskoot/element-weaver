import {Column, Text} from '@wonderlandengine/react-ui/components';
import {Align, Justify} from '@wonderlandengine/react-ui';
import {colorSwatch} from '../../utils/colorSwatch.ts';
import {useHudViewModel} from './useHudViewModel.ts';
import {formatNumber} from '@sorskoot/wonderland-components';

export const Hud = () => {
    const vm = useHudViewModel();

    return (
        <Column
            gap={10}
            width="100%"
            height="100%"
            padding={16}
            justifyContent={Justify.FlexStart}
            alignItems={Align.FlexStart}
        >
            <Text color={colorSwatch.Text} fontSize={24} textAlign="left" text={`Score: ${formatNumber(vm.score)}`} />
            <Text color={colorSwatch.Text} fontSize={24} textAlign="left" text={`Multiplier: ${formatNumber(vm.multiplier)}`} />
        </Column>
    );
};

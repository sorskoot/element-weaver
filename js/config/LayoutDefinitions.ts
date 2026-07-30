import {Axial} from '../types/Axial.ts';
import {LayoutDefinition} from '../types/LayoutDefinition.ts';

export const BOARD_RADIUS = 3;

const layout = (
    value: Omit<LayoutDefinition, 'radius' | 'blocked'> & {blocked?: readonly Axial[]}
): LayoutDefinition => ({...value, radius: BOARD_RADIUS, blocked: value.blocked ?? []});

export const GROVE_LAYOUTS: readonly LayoutDefinition[] = [
    layout({
        id: 'cozy-grove',
        name: 'Cozy Grove',
        subtitle: 'the open meadow',
        description: 'A wide open clearing, perfect for learning the rhythm of the grove.',
        difficulty: 1,
        accent: '#A8C39A',
        icon: 'G',
    }),
    // layout({
    //     id: 'stream-path',
    //     name: 'Stream Path',
    //     subtitle: 'a river runs through',
    //     description: 'A winding stream cuts diagonally across the grove. Work around it.',
    //     difficulty: 2,
    //     blocked: [
    //         [-3, 3],
    //         [-2, 2],
    //         [-1, 1],
    //         [0, 0],
    //         [1, -1],
    //         [2, -2],
    //         [3, -3],
    //     ].map(([q, r]) => ({q, r})),
    //     accent: '#9FC8DC',
    //     icon: 'S',
    // }),
    // layout({
    //     id: 'garden-patch',
    //     name: 'Garden Patch',
    //     subtitle: 'planted corners',
    //     description: 'Stone planters occupy four corners of the grove. Bloom in the cross.',
    //     difficulty: 3,
    //     blocked: [
    //         [-3, 0],
    //         [-3, 1],
    //         [-2, 1],
    //         [0, -3],
    //         [1, -3],
    //         [1, -2],
    //         [3, -1],
    //         [3, 0],
    //         [2, 0],
    //         [0, 3],
    //         [-1, 3],
    //         [-1, 2],
    //     ].map(([q, r]) => ({q, r})),
    //     accent: '#EDC765',
    //     icon: 'P',
    // }),
    // layout({
    //     id: 'stone-circle',
    //     name: 'Stone Circle',
    //     subtitle: 'ancient ring',
    //     description: 'A ring of standing stones surrounds the grove. Only the inner sanctum is yours.',
    //     difficulty: 4,
    //     blocked: cellsInRadius(BOARD_RADIUS).filter(
    //         ({q, r}) => Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r)) === BOARD_RADIUS
    //     ),
    //     accent: '#C9A26A',
    //     icon: 'O',
    // }),
    // layout({
    //     id: 'winding-path',
    //     name: 'Winding Path',
    //     subtitle: 'the long way round',
    //     description: 'A zigzag of stones forces long, winding placements. The hardest grove.',
    //     difficulty: 5,
    //     blocked: [
    //         [-3, 1],
    //         [-2, 1],
    //         [-2, 0],
    //         [-1, -1],
    //         [0, -1],
    //         [0, -2],
    //         [1, 0],
    //         [1, 1],
    //         [2, 1],
    //         [2, -1],
    //         [3, -1],
    //     ].map(([q, r]) => ({q, r})),
    //     accent: '#D8A2BC',
    //     icon: 'W',
    //}),
];

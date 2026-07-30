import {Axial} from './Axial.ts';

export interface LayoutDefinition {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    radius: number;
    blocked: readonly Axial[];
    accent: string;
    icon: string;
}

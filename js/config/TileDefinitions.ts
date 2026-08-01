 import {TileDefinition} from '../types/HexTile.ts';

export const NATURE_TILES: readonly TileDefinition[] = [
    {id: 'mushroom', name: 'mushroom', prefab: 'Tile_Mushroom'},
    {id: 'leaf', name: 'leaf', prefab: 'Tile_Leaf'},
    {id: 'raindrop', name: 'raindrop', prefab: 'Tile_Raindrop'},
    {id: 'sunflower', name: 'sunflower', prefab: 'Tile_Sunflower'},
    {id: 'berry', name: 'berry', prefab: 'Tile_Berry'},
    {id: 'acorn', name: 'acorn', prefab: 'Tile_Acorn'},
    {id: 'pine-cone', name: 'pine cone', prefab: 'Tile_Pinecone'},
    {id: 'feather', name: 'feather', prefab: 'Tile_Feather'},
];


 const tiles= {
     mushroom: ["mushroom", "#EEB98A", "#A25A2E", "#F8D3AE", "#D4694B", "#F0C5A8"],
     leaf: ["leaf", "#AACF9C", "#4E7A4A", "#CBDFBF", "#4E9A50", "#A8D8A0"],
     raindrop: ["raindrop", "#9FC8DC", "#3E6E8C", "#C4DCEA", "#3A8EC0", "#82C8E8"],
     sunflower: ["sunflower", "#F2D06A", "#9C7718", "#F7E3A6", "#F4C430", "#FDE87A"],
     berry: ["berry", "#D8A2BC", "#8C4E66", "#EBC5D3", "#CE5E8E", "#F0AACC"],
     acorn: ["acorn", "#C8A985", "#72513A", "#E6D0B4", "#A96332", "#D7A064"],
     "pine-cone": ["pine-cone", "#B7B98A", "#62663B", "#DADCB5", "#886235", "#C6A06A"],
     feather: ["feather", "#B9AED7", "#66578D", "#DCD5EE", "#8E7CBE", "#D2C8E8"],
 };
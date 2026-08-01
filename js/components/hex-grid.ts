import {Component, Object3D, WonderlandEngine} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {TilePrefabs} from './tile-prefabs.ts';
import {SelfDestruct, wlUtils} from '@sorskoot/wonderland-components';
import {serviceLocator} from '../utils/ServiceLocator.ts';
import {GamePlayService} from '../services/GamePlayService.ts';
import {TileData} from './tile-data.ts';
import {TileMaterials} from './tile-materials.ts';
import {quat} from 'gl-matrix';
import {EWUtils} from '../utils/EWUtils.ts';
import {NATURE_TILES} from '../config/TileDefinitions.ts';
import {TileId} from '../types/HexTile.ts';

const tempQuat = quat.create();

export class HexGrid extends Component {
    static TypeName = 'hex-grid';

    static onRegister(engine: WonderlandEngine) {
        engine.registerComponent(TileData);
        engine.registerComponent(SelfDestruct);
    }

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    private get gamePlayService(): GamePlayService {
        return serviceLocator.get<GamePlayService>(GamePlayService);
    }

    private hexTiles: Map<string, Object3D> = new Map();

    init() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    start() {
        // setTimeout(() => {
        //     const t = this.tilePrefabs.spawn('Tile')!;
        //     t.resetPosition();
        //     t.parent = this.object;
        //     wlUtils.setActive(t, true);
        // }, 1000);
    }
    onActivate() {
        this.gamePlayService.onNewGame.add(this.onNewGame);
        this.gamePlayService.onTilesChanged.add(this.onTilesChanged);
    }

    onDeactivate() {
        this.gamePlayService.onNewGame.remove(this.onNewGame);
        this.gamePlayService.onTilesChanged.remove(this.onTilesChanged);
    }

    private onNewGame = () => {
        this.hexTiles.forEach((tile) => {
            if (tile && !tile.isDestroyed) {
                tile.destroy();
            }
        });
        this.hexTiles.clear();
    };

    private onTilesChanged = (changedTileIds: TileId[]) => {
        for (const tileId of changedTileIds) {
            // currently the only changes that are possible is that it's either a new tiles,
            // or a placeholder tile that is replaced by a normal one. If we have a tile with an ID
            // already in the game, we can assume that it's a placeholder that needs to be replaced.
            // So we deleted the existing tile and spawn a new one in its place.
            const existingTile = this.hexTiles.get(tileId);
            if (existingTile && !existingTile.isDestroyed) {
                // Hide the old tile and destroy it after a short delay to allow the hover events to complete.
                existingTile.setScalingWorld([0, 0, 0]);
                existingTile.addComponent(SelfDestruct, {delay: 500});
                this.hexTiles.delete(tileId);
            }
            const tile = this.gamePlayService.getTile(tileId);
            if (tile) {
                let newTile: Object3D;
                if (tile.type === 'placeholder') {
                    newTile = this.tilePrefabs.spawn('Placeholder')!;
                } else {
                    const tileData = this.gamePlayService.getTileDataById(tileId);
                    if (tileData && tileData.type === 'piece') {
                        const t = NATURE_TILES.find((nt) => nt.id === tileData.tileId);
                        if (!t) {
                            console.error(`No tile definition found for tileId: ${tileId}`);
                            return;
                        }
                        newTile = this.tilePrefabs.spawn(t.prefab)!;
                    } else {
                        return;
                    }
                    //     newTile.getComponent(TileMaterials)!.setMaterials(tileData.elements);
                    // }
                }
                newTile.addComponent(TileData, {tileId: tileId});
                newTile.resetPosition();
                newTile.parent = this.object;
                const pos = tile.to2D();
                newTile.setPositionLocal([pos.x, 0, pos.y]);
                wlUtils.setActive(newTile, true);
                this.hexTiles.set(tileId, newTile);
            }
        }
    };
}

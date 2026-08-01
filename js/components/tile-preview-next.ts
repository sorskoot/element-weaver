import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {NATURE_TILES} from '../config/TileDefinitions.ts';
import {GamePlayService} from '../services/GamePlayService.ts';
import {DominoPiece} from '../types/DominoPiece.ts';
import {serviceLocator} from '../utils/ServiceLocator.ts';
import {HexTileElements, HexTilePiece} from '../types/HexTile.ts';
import {TilePrefabs} from './tile-prefabs.ts';
import {TileMaterials} from './tile-materials.ts';
import {TileInteractionService} from '../services/TileInteractionService.ts';
import {quat, vec3} from 'gl-matrix';
import {EWUtils} from '../utils/EWUtils.ts';
import {Mathf} from '@sorskoot/wonderland-components';

const tempQuat = quat.create();

export class TilePreviewNext extends Component {
    static TypeName = 'tile-preview-next';

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    private previewTileObject?: Object3D;
    private previewMaterials?: TileMaterials;

    private get gamePlayService() {
        return serviceLocator.get<GamePlayService>(GamePlayService);
    }

    private readonly defaultScale = [1, 1, 1];
    private currentPos = vec3.create();

    start() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    onActivate() {
        this.gamePlayService.onTilePreviewChanged.add(this.onTilePreviewChanged);
    }

    onDeactivate() {
        this.gamePlayService.onTilePreviewChanged.remove(this.onTilePreviewChanged);
    }

    // private v = 0;
    // update(dt: number) {
    //     if (!this.previewTileObject) {
    //         return;
    //     }
    //     this.currentPos[1] = Math.sin(this.v * 10) * 0.05 + 0.2;
    //     this.previewTileObject!.setPositionLocal(this.currentPos);
    //     this.v += dt;
    // }

    private onTilePreviewChanged = (currentPiece: DominoPiece, nextPiece: DominoPiece) => {
        // delete existing tiles if any
        if(this.object.childrenCount>0){
            let children = [...this.object.children];
            children.forEach(child => {
                if(!child.isDestroyed) {
                    child.destroy();
                }
            });
        }

        // create tile 1
        const t = NATURE_TILES.find((nt) => nt.id === nextPiece.first)!;
        const tile1 = this.tilePrefabs.spawn(t.prefab)!;
        tile1.resetPosition();
        tile1.parent = this.object;
        // create tile 2 based on rotation.

        const t2 = NATURE_TILES.find((nt) => nt.id === nextPiece.second)!;
        const tile2 = this.tilePrefabs.spawn(t2.prefab)!;
        tile2.resetPosition();
        const x2D = 1 * Math.sqrt(3) * (1 + -1 / 2);
        const y2D = 1 * (3 / 2) * -1;
        tile2.translateLocal([x2D,0,y2D])
        tile2.parent = this.object;
        //this.previewMaterials?.setMaterials(tileData.);
        // const rotation = EWUtils.rotationToDegrees(currentPiece.direction);
        // quat.fromEuler(tempQuat, 0, rotation, 0);
        // this.previewTileObject!.setRotationLocal(tempQuat);
    };

    // private createPreviewTileObject() {
    //     this.previewTileObject = this.tilePrefabs.spawn('Tile')!;
    //     this.previewMaterials = this.previewTileObject.getComponent(TileMaterials)!;
    //     this.previewTileObject.resetPosition();
    //     this.previewTileObject.parent = this.object;
    //     this.previewTileObject.setScalingWorld([0, 0, 0]);
    // }
}

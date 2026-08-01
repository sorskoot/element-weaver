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

export class TilePreview extends Component {
    static TypeName = 'tile-preview';

    @property.object({required: true})
    declare public tilePrefabsObject: Object3D;
    declare private tilePrefabs: TilePrefabs;

    private previewTileObject1?: Object3D;
    private previewTileObject2?: Object3D;

    private get gamePlayService() {
        return serviceLocator.get<GamePlayService>(GamePlayService);
    }

    private get tileInteractionService() {
        return serviceLocator.get<TileInteractionService>(TileInteractionService);
    }

    private readonly defaultScale = [1, 1, 1];
    private currentPos1 = vec3.create();
    private currentPos2 = vec3.create();

    start() {
        this.tilePrefabs = this.tilePrefabsObject.getComponent(TilePrefabs)!;
    }

    onActivate() {
        this.gamePlayService.onTilePreviewChanged.add(this.onTilePreviewChanged);
        this.tileInteractionService.onTileHover.add(this.onTileHover);
        this.tileInteractionService.onTileClick.add(this.onTileUnhover);
        this.tileInteractionService.onTileUnhover.add(this.onTileUnhover);
    }

    onDeactivate() {
        this.gamePlayService.onTilePreviewChanged.remove(this.onTilePreviewChanged);
        this.tileInteractionService.onTileHover.remove(this.onTileHover);
        this.tileInteractionService.onTileClick.remove(this.onTileUnhover);
        this.tileInteractionService.onTileUnhover.remove(this.onTileUnhover);
    }

    private v = 0;
    update(dt: number) {
        if (!this.previewTileObject1 || !this.previewTileObject2) {
            return;
        }
        this.currentPos1[1] = Math.sin(this.v * 10) * 0.05 + 0.2;
        this.previewTileObject1!.setPositionLocal(this.currentPos1);
        this.currentPos2[1] = Math.sin(this.v * 10) * 0.05 + 0.2;
        this.previewTileObject2!.setPositionLocal(this.currentPos2);
        this.v += dt;
    }

    private onTilePreviewChanged = (currentPiece: DominoPiece, nextPiece: DominoPiece) => {
        if(this.previewTileObject1 && !this.previewTileObject1.isDestroyed) {
            this.previewTileObject1?.destroy();
        }
        if(this.previewTileObject2 && !this.previewTileObject2.isDestroyed) {
            this.previewTileObject2?.destroy();
        }

        const t = NATURE_TILES.find((nt) => nt.id === currentPiece.first)!;
        this.previewTileObject1 = this.tilePrefabs.spawn(t.prefab)!;
        this.previewTileObject1.resetPosition();
        this.previewTileObject1.parent = this.object;
        this.previewTileObject1.setScalingWorld([0, 0, 0]);

        const t2 = NATURE_TILES.find((nt) => nt.id === currentPiece.second)!;
        this.previewTileObject2 = this.tilePrefabs.spawn(t2.prefab)!;
        this.previewTileObject2.resetPosition();
        this.previewTileObject2.parent = this.object;
        this.previewTileObject2.setScalingWorld([0, 0, 0]);

        //this.previewMaterials?.setMaterials(tileData.);
        const rotation = EWUtils.rotationToDegrees(currentPiece.direction);
        quat.fromEuler(tempQuat, 0, rotation, 0);
        this.previewTileObject1!.setRotationLocal(tempQuat);
    };

    private onTileHover = (tileId: string, tilePos: {x: number; y: number}) => {
        if (!this.previewTileObject1 || !this.previewTileObject2) {

            return; // don't show if no preview
        }
        this.previewTileObject1!.setScalingLocal(this.defaultScale);
        this.currentPos1 = [tilePos.x, 0.4, tilePos.y];
        this.previewTileObject1!.setPositionLocal(this.currentPos1);
        const x2D = 1 * Math.sqrt(3) * (1 + -1 / 2);
        const y2D = 1 * (3 / 2) * -1;
        this.currentPos2 = [tilePos.x+x2D, 0.4, tilePos.y+y2D];

        this.previewTileObject2!.setPositionLocal(this.currentPos2);
        this.previewTileObject2!.setScalingLocal(this.defaultScale);
    };

    private onTileUnhover = (tileId: string) => {
        if (!this.previewTileObject1 || !this.previewTileObject2) {
            return; // don't hide if no preview
        }
        this.previewTileObject1!.setScalingWorld([0, 0, 0]);
        this.previewTileObject2!.setScalingWorld([0, 0, 0]);
    };

}

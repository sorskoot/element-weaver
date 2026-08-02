export type Point2D = {
    x: number;
    y: number;
}

export type Point3D = {
    x: number;
    y: number;
    z: number;
}

export function sumPoint2D(a: Point2D, b: Point2D): Point2D {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}

export function sumPoint3D(a: Point3D, b: Point3D): Point3D {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
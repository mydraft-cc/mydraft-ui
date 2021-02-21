/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ShapeInfo } from '@app/wireframes/model';
import * as React from 'react';
import { useDrag } from 'react-dnd';

interface ShapeImageProps {
    // The shape data.
    shape: ShapeInfo;
}

export const ShapeImage = React.memo((props: ShapeImageProps) => {
    const { shape } = props;

    const [, drag, connectDragPreview] = useDrag({
        item: { shape: shape.name, offset: shape.offset, type: 'DND_ASSET' },
    });

    React.useEffect(() => {
        const image = new Image();
        image.src = dragPath(shape);
        image.alt = '';

        connectDragPreview(image, {
            anchorX: 0,
            anchorY: 0,
        });
    }, [connectDragPreview]);

    return (
        <>
            <img ref={drag} className='asset-shape-image' alt={shape.displayName} src={previewPath(shape)} />
        </>
    );
});

const pathToShapes = require.context('../../../images/shapes', true);

const previewPath = (shape: ShapeInfo) => {
    try {
        return pathToShapes(`./${shape.displaySearch}-preview.png`).default;
    } catch {
        return pathToShapes(`./${shape.displaySearch}.png`).default;
    }
};

const dragPath = (shape: ShapeInfo) => {
    return pathToShapes(`./${shape.displaySearch}.png`).default;
};

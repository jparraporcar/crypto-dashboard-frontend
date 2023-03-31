/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { GltfModel } from './GltfModel'
import React from 'react'

export const ModelViewer: React.FC = (): JSX.Element => {
    return (
        <Canvas
            camera={{
                fov: 75,
                near: 100,
                far: 100000,
                position: [1000, 1000, 1000],
            }}
            style={{ height: '100vh' }}
        >
            <Suspense>
                <pointLight intensity={50} position={[500, 1000, 1200]} />
                <pointLight intensity={50} position={[-1000, 0, -1000]} />
                <pointLight intensity={50} position={[0, -1000, 0]} />
                <GltfModel />
            </Suspense>
        </Canvas>
    )
}

/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const GltfModel = () => {
    const ref = useRef()
    const gltf = useLoader(GLTFLoader, 'bitcoin.glb')

    useFrame((state, delta) => (ref.current.rotation.y += 0.01))

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            position={[-200, 600, 200]}
        ></primitive>
    )
}

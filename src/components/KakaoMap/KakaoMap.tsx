// import { useState } from "react";
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import styles from './KakaoMap.module.css'

export default function KakaoMap() {
  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: '100%', height: '400px' }}
    >
      <CustomOverlayMap position={{ lat: 33.450701, lng: 126.570667 }}>
        <div className={styles.customMarker}></div>
      </CustomOverlayMap>
    </Map>
  )
}

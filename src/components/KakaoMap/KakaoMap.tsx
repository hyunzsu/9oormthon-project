import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

export default function KakaoMap() {
  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      style={{ width: '100%', height: '400px' }}
    >
      <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
        <div style={{ color: '#000' }}>Hello, World!</div>
      </MapMarker>
    </Map>
  )
}

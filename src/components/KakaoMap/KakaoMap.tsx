import { useState } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'
import styles from './KakaoMap.module.css'

export default function KakaoMap() {
  // 현재 위치를 저장할 상태
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isPanto: false,
  })

  // 현재 위치로 이동
  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isPanto: true,
          })
        },
        error => {
          console.error('Error getting current location:', error)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  // 지도 클릭 시 호출되는 함수
  const handleMapClick = (target, mouseEvent) => {
    const latlng = MouseEvent.latLng
    setState({
      center: { lat: latlng.getLat(), lng: latlng.getLng() },
    })
  }

  return (
    <>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: '100%', height: '400px' }}
        level={3}
        onClick={handleMapClick}
      >
        {/* <CustomOverlayMap position={state.center}>
          <div className={styles.customMarker}></div>
        </CustomOverlayMap> */}
        <MapMarker position={state.center} />
      </Map>

      <button className={styles.button} onClick={moveToCurrentLocation}>
        현재
      </button>

      <div>
        {state &&
          `클릭한 위치의 위도는 ${state.center.lat} 이고, 경도는 ${state.center.lng} 입니다`}
      </div>
    </>
  )
}

'use client';

import { useState } from 'react';

import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { MapContainer } from '@/widgets/around/ui/MapContainer';
import { KakaoPlace } from '@/shared/types/map';
import { PlaceListState } from '@/entities/place/ui/PlaceListState';
import { BottomSheet } from '@/shared/ui/place/BottomSheet';
import { PlaceDetailSheet } from '@/entities/place/ui/PlaceDetailSheet';
import { useAroundLogic } from '@/widgets/around/model/useAroundLogic';

export default function AroundPage() {
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  
  const { showMap, keyword, setKeyword, handleToggleMap, displayCenter, displayShops, isPending} = useAroundLogic()
  return (
    <div className="bg-[#FFFBEB] h-screen pb-24">

      <AroundHeader 
          showMap={showMap} 
          toggle={handleToggleMap} 
          onSearch={setKeyword}
          keyword={keyword}
      />

      <main>
        {showMap && displayShops.length > 0 && (
          <MapContainer
            center={displayCenter}
            places={displayShops}
            onMarkerClick={(place: KakaoPlace) => {
              console.log('내 장소:', place)
              setSelectedPlace(place)
            }}
          />
        )}

        <div className='p-6'>

          <PlaceListState
            isPending={isPending}
            places={displayShops}
            onPlaceClick={(place) => {
              console.log('place info', place)
              setSelectedPlace(place)
            }
            }
          />
        </div>

        <BottomSheet
          isOpen={selectedPlace !== null}
          onClose={() => setSelectedPlace(null)}
        >
          {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
        </BottomSheet>
      </main>
    </div>
  );
}
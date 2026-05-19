import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { type Coords } from '../utils/distance';

// Default fallback: Paris 11ème
const PARIS_11: Coords = { lat: 48.8534, lng: 2.3708 };

export type LocationState =
  | { status: 'loading' }
  | { status: 'granted'; coords: Coords }
  | { status: 'denied'; coords: Coords };

export function useLocation(): LocationState {
  const [state, setState] = useState<LocationState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;

      if (status !== 'granted') {
        setState({ status: 'denied', coords: PARIS_11 });
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setState({
            status: 'granted',
            coords: { lat: loc.coords.latitude, lng: loc.coords.longitude },
          });
        }
      } catch {
        if (!cancelled) setState({ status: 'denied', coords: PARIS_11 });
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return state;
}

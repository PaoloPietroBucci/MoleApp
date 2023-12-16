import { createNavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = createNavigationContainerRef()

export function navigate(name:never, params:never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  } else {
    console.log('navigazione non pronta')
  }
}
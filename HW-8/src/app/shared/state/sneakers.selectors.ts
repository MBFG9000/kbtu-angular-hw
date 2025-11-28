import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SneakersState } from './sneakers.reducer';

// Имя фичи в provideStore()
export const SNEAKERS_FEATURE_KEY = 'sneakers';

// 1) Базовый селектор: достаёт весь state фичи Sneakers
export const selectSneakersState =
  createFeatureSelector<SneakersState>(SNEAKERS_FEATURE_KEY);

//
// ========== СПИСОК КРОССОВОК ==========
//

// 2) Селектор списка кроссовок
export const selectSneakers = createSelector(
  selectSneakersState,
  (state) => state.sneakers
);

// 3) Селектор loading флага списка
export const selectListLoading = createSelector(
  selectSneakersState,
  (state) => state.listLoading
);

// 4) Селектор ошибки списка
export const selectListError = createSelector(
  selectSneakersState,
  (state) => state.listError
);

//
// ========== ДЕТАЛИ КРОССОВКА ==========
//

// 5) Выбранный sneaker
export const selectSelectedSneaker = createSelector(
  selectSneakersState,
  (state) => state.selectedSneaker
);

// 6) loading для деталей
export const selectDetailsLoading = createSelector(
  selectSneakersState,
  (state) => state.detailsLoading
);

// 7) ошибка деталей
export const selectDetailsError = createSelector(
  selectSneakersState,
  (state) => state.detailsError
);

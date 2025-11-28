import { createReducer, on } from "@ngrx/store";
import { Sneaker } from "../models/sneakers.model";
import * as SneakersActions from './sneakers.actions';

// Reducer описывает изменения 
// состояний 

export interface SneakersState {
  sneakers: Sneaker[];            // список кроссовок
  selectedSneaker: Sneaker | null; // выбранный кроссовок

  listLoading: boolean;           // загрузка списка
  listError: string | null;       // ошибка списка

  detailsLoading: boolean;        // загрузка деталей
  detailsError: string | null;    // ошибка деталей
}

export const initialSneakersState: SneakersState = {
  sneakers: [],
  selectedSneaker: null,

  listLoading: false,
  listError: null,

  detailsLoading: false,
  detailsError: null,
};

export const sneakersReducer = createReducer(
  initialSneakersState,

  //
  // === СПИСОК КРОССОВОК ===
  //

  // loadSneakers — начинаем загрузку списка
  on(SneakersActions.loadSneakers, (state): SneakersState => ({
    ...state,
    listLoading: true,
    listError: null,
  })),

  // loadSneakersSuccess — успешно получили список
  on(SneakersActions.loadSneakersSuccess, (state, { sneakers }): SneakersState => ({
    ...state,
    sneakers,
    listLoading: false,
    listError: null,
  })),

  // loadSneakersFailure — ошибка при загрузке списка
  on(SneakersActions.loadSneakersFailure, (state, { error }): SneakersState => ({
    ...state,
    listLoading: false,
    listError: error,
  })),

  //
  // === ДЕТАЛИ ОДНОГО КРОССОВКА ===
  //

  // loadSneaker — запрос деталей
  on(SneakersActions.loadSneaker, (state): SneakersState => ({
    ...state,
    detailsLoading: true,
    detailsError: null,
  })),

  // loadSneakerSuccess — получили один sneaker
  on(SneakersActions.loadSneakerSuccess, (state, { sneaker }): SneakersState => ({
    ...state,
    selectedSneaker: sneaker,
    detailsLoading: false,
    detailsError: null,
  })),

  // loadSneakerFailure — ошибка при загрузке одного sneaker
  on(SneakersActions.loadSneakerFailure, (state, { error }): SneakersState => ({
    ...state,
    detailsLoading: false,
    detailsError: error,
  }))
);
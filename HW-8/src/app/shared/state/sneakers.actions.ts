// src/app/items/state/sneakers.actions.ts
// (или items.actions.ts — как ты назовёшь)

import { createAction, props } from "@ngrx/store";
import { Sneaker } from "../models/sneakers.model";

// Actions - банально описывает какие могут быть совершены 
// действия с теми или иными обьектами на фронте 
// тут нет реализации или изменений каких либо 
// это просто некий шаблон для действий

//
// ====== Список кроссовок ======
//

// Запросить список (optional query)
export const loadSneakers = createAction(
  '[Sneakers] Load Sneakers',
  props<{ query?: string }>()
);

// Успешно получили список
export const loadSneakersSuccess = createAction(
  '[Sneakers] Load Sneakers Success',
  props<{ sneakers: Sneaker[] }>()
);

// Ошибка загрузки списка
export const loadSneakersFailure = createAction(
  '[Sneakers] Load Sneakers Failure',
  props<{ error: string }>()
);

//
// ====== Один кроссовок (детали) ======
//

// Запросить один sneaker
export const loadSneaker = createAction(
  '[Sneakers] Load Sneaker',
  props<{ id: number | string }>()
);

// Успешно получили один sneaker
export const loadSneakerSuccess = createAction(
  '[Sneakers] Load Sneaker Success',
  props<{ sneaker: Sneaker }>()
);

// Ошибка загрузки одного sneaker
export const loadSneakerFailure = createAction(
  '[Sneakers] Load Sneaker Failure',
  props<{ error: string }>()
);

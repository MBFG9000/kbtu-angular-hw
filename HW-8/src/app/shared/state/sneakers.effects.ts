// src/app/sneakers/state/sneakers.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as SneakersActions from './sneakers.actions';
import { DataService } from '../../data.service'; // путь подгони под свой

@Injectable()
export class SneakersEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}

  // ===== ЗАГРУЗКА СПИСКА КРОССОВОК =====
  loadSneakers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SneakersActions.loadSneakers), // слушаем этот action
      switchMap(({ query }) => {
        const trimmed = query?.trim() ?? '';

        const request$ = trimmed
          ? this.dataService.searchSneakers(trimmed)
          : this.dataService.getSneakers();

        return request$.pipe(
          map((sneakers) =>
            SneakersActions.loadSneakersSuccess({ sneakers })
          ),
          catchError((error) =>
            of(
              SneakersActions.loadSneakersFailure({
                error:
                  trimmed
                    ? 'Unable to search right now. Try again shortly.'
                    : 'Something went wrong while loading the catalog. Please try again.',
              })
            )
          )
        );
      })
    )
  );

  // ===== ЗАГРУЗКА ОДНОГО КРОССОВКА (детали) =====
  loadSneaker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SneakersActions.loadSneaker),
      switchMap(({ id }) =>
        this.dataService.getSneakerById(id).pipe( // предполагаемый метод
          map((sneaker) =>
            SneakersActions.loadSneakerSuccess({ sneaker })
          ),
          catchError((error) =>
            of(
              SneakersActions.loadSneakerFailure({
                error: 'Failed to load sneaker details. Please try again.',
              })
            )
          )
        )
      )
    )
  );
}

// src/app/sneakers/state/sneakers.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as SneakersActions from './sneakers.actions';
import { DataService } from '../../data.service'; // путь подгони под свой

@Injectable()
export class SneakersEffects {
  // use inject to avoid undefined references during field initialization
  private readonly actions$ = inject(Actions);
  private readonly dataService = inject(DataService);

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
      switchMap(({ id }) => {
        const sneakerId = Number(id);

        return this.dataService.getSneaker(sneakerId).pipe(
          map((sneaker) =>
            SneakersActions.loadSneakerSuccess({ sneaker })
          ),
          catchError((error) =>
            of(
              SneakersActions.loadSneakerFailure({
                error: error?.status === 404
                  ? 'Sneaker not found.'
                  : 'Failed to load sneaker details. Please try again.',
              })
            )
          )
        );
      })
    )
  );
}

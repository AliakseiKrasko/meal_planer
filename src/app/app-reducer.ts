import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  themeMode: 'light' as ThemeMode,
}
export const changeThemeModeAC = createAction('app/changeThemeMode', (themeMode: ThemeMode) => {
  return {payload: {
      themeMode
    }}
})

export const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(changeThemeModeAC, (state, action) => {
      // Установка темы из payload экшена
      state.themeMode = action.payload.themeMode;
    });
});

export type ThemeMode = 'dark' | 'light'
import type { RootState } from './store.ts'
import { ThemeMode } from './app-reducer.ts'

// Возвращаем конкретное значение themeMode из среза состояния
export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode; // <-- ИСПРАВЛЕНО- ИСПРАВЛЕНО
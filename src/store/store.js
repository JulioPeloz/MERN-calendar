import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui:uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ //esta configuración es para eliminar el error de fechas serializables
        serializableCheck: false
    })
})
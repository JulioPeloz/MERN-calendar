import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';

describe('Pruebas en el calendarSlice', () => { 
    test('Debe regresar el estado por defecto', () => { 
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
     });

    test('onSetActiveEvent debe activar el evento ', () => { 
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent( events[0] ));
        //console.log(state);
        expect(state.activeEvent).toEqual(events[0]);
     });

    test('onAddNewEvent debe agregar un evento', () => { 
        const newEvent = {
            id: '3',
            start: new Date('2023-11-08 18:29:00'),
            end: new Date('2023-11-08 20:29:00'),
            title: 'Cumpleaños de David',
            notes: 'Nota de testeo',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        //console.log(state);
        expect(state.events).toEqual([...events, newEvent]);
     });

    test('onUpdateEvent debe actualizar el evento ya existente', () => { 
        const updatedEvent = {
            id: '1',
            start: new Date('2023-09-08 18:29:00'),
            end: new Date('2023-09-08 20:29:00'),
            title: 'Cumpleaños de Julio actualizado',
            notes: 'Nota de testeo actualizado',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        //console.log(state);
        expect(state.events).toContain( updatedEvent );
     });

    test('onDeleteEvent debe borrar el evento activo', () => { 
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent());
        //console.log(state);
        expect(state.activeEvent).toBe( null );
        expect(state.events).not.toContain(events[0]);
     });

    test('onLoadEvents debe establecer los eventos', () => { 
        const state = calendarSlice.reducer(initialState, onLoadEvents( events ));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer(state, onLoadEvents( events ));
        expect(state.events.length).toBe(events.length)
     });

    test('onLogoutCalendar debe limpiar el estado', () => { 
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar());
        console.log(state);
        expect(state).toEqual(initialState)
     })
 })
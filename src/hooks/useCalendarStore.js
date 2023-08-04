import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { converEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async(calendarEvent) => {

        try {

            if(calendarEvent.id){
                //Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return;
            }
    
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            console.log(data);
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user}));
            
        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", error.response.data.msg, 'error');
        }


    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = converEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
            console.log(events);

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);

        }
    }

    return{
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
    }
}
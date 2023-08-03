import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async(calendarEvent) => {

        //TODO: Update event
        if(calendarEvent._id){
            //Actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }))
        }else{
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            console.log(data);
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
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
    }
}
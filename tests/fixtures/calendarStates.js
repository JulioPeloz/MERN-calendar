export const events =  [
    {
        id: '1',
        start: new Date('2023-09-08 18:29:00'),
        end: new Date('2023-09-08 20:29:00'),
        title: 'Cumpleaños de Julio',
        notes: 'Nota de testeo',
    },
    {
        id: '2',
        start: new Date('2023-10-08 18:29:00'),
        end: new Date('2023-10-08 20:29:00'),
        title: 'Cumpleaños de David',
        notes: 'Nota de testeo',
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0]},
}
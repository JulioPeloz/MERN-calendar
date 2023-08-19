import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");

describe('Pruebas en el <FabDelete/>', () => { 

    const mockStartDeletingEvent = jest.fn();
    beforeEach ( () => jest.clearAllMocks());

    test('Debe mostrar el componente correctamente', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })
        render(<FabDelete/>);
        screen.debug();

        const btn = screen.getByLabelText('btn-delete');

        //console.log(btn.classList.toString());

        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect(btn.style.display).toBe('none');

     });

    test('Debe mostrar el botón si hay un evento activo', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })
        render(<FabDelete/>);
        screen.debug();

        const btn = screen.getByLabelText('btn-delete');

        //console.log(btn.classList.toString());

        expect(btn.style.display).toBe('');

     });

    test('Debe llamar al startDeletingEvent si hay un evento activo', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })
        render(<FabDelete/>);
        screen.debug();

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );

        //console.log(btn.classList.toString());

        expect(mockStartDeletingEvent).toHaveBeenCalled();

     });
 })
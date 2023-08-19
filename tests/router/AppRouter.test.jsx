import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('Pruebas en el <AppRouter/>', () => { 

    const mockCheckAuthToken = jest.fn();

    beforeEach ( () => jest.clearAllMocks());

    test('debe mostrar la pantalla de carga y llamar al checkAuthToken', () => { 
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        })
        render(<AppRouter/>);

        screen.debug();

        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
     });

    test('Debe mostrar el login en caso de no estar autenticado', () => { 

        useAuthStore.mockReturnValue({
            status: 'Not-Authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/algo/asdfg']}>
                <AppRouter/>
            </MemoryRouter>
        );

        screen.debug();

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect( container ).toMatchSnapshot();
     });

     test('Debe mostrar el calendario si estamos autenticados', () => { 

        useAuthStore.mockReturnValue({
            status: 'Authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        );

        screen.debug();

        expect(screen.getByText('CalendarPage')).toBeTruthy();

     });
 })
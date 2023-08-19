import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

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
 })
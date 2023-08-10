import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en el authSlice', () => { 
    test('Debe regresar el estado inicial', () => { 
        expect(authSlice.getInitialState()).toEqual(initialState);
     });

    test('Debe realizar un login', () => { 
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        //console.log(state);
        expect(state).toEqual({
            status: 'Authenticated',
            user: testUserCredentials,
            errorMessage: undefined
          });
     });

    test('Debe realizar el logout', () => { 
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'Not-Authenticated',
            user: {},
            errorMessage: undefined,
        })
     });

    test('Debe realizar el logout', () => { 
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'Not-Authenticated',
            user: {},
            errorMessage: errorMessage,
        })
     });

    test('Debe limpiar el mensaje de error', () => { 
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer( state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined);
     })
 })
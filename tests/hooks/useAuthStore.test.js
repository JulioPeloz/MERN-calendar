import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from "../../src/api";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('Pruebas en el useAuthStore', () => { 

    beforeEach(() => localStorage.clear());

    test('Debe regresar los valores por defecto', () => { 

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
          });
     });

    test('startLogin debe realizar el login correctamente', async() => { 

        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async() => {
            await result.current.startLogin( testUserCredentials );
        })

        const { errorMessage, status, user } = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'Authenticated',
            user: {name: "Test User", uid: "64d277aa5d567c660b27f201"}
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
     });

    test('startLogin debe de fallar la autenticación', async() => { 

        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async() => {
            await result.current.startLogin( {email: 'fallar@gmail.com', password: '123456'} );
        })

        const { errorMessage, status, user } = result.current;

        //console.log({ errorMessage, status, user })

        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'Not-Authenticated',
            user: {}
        })

        waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );
     });

    test('startRegister debe crear un usuario', async() => { 

        const newUser = {email: 'fallar@gmail.com', password: '123456', name:'Test user 2'} 
        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
            data:{
                ok: true,
                uid: 'ID-startRegister-useAuthStore',
                name: 'Test user 2',
                token: 'Token-test'
            }
        });

        await act( async() => {
            await result.current.startRegister(newUser);
        });

        const {errorMessage, status, user} = result.current

        //console.log({errorMessage, status, user});
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: "Authenticated",
            user: {
                name: "Test user 2",
                uid: "ID-startRegister-useAuthStore",
            },
        });

        //Destruye el espia por si se llega a utilizar el (calendarApi, "post"), se pueda realizar el posteo sin problemas
        spy.mockRestore();

     });

    test('startRegister debe fallar la creación de usuario', async() => { 
        
        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async() => {
            await result.current.startRegister(testUserCredentials);
        });

        const {errorMessage, status, user} = result.current
        
        //console.log({errorMessage, status, user});
        expect({errorMessage, status, user}).toEqual({
            errorMessage: "El correo introducido ya fue utilizado",
            status: 'Not-Authenticated',
            user: {}
        });

     });

    test('checkAuthToken debefallar si no hay un token', async() => { 
        const mockStore = getMockStore({...initialState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async() => {
            await result.current.checkAuthToken();
        });

        const {errorMessage, status, user} = result.current;

        console.log({errorMessage, status, user});

        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'Not-Authenticated',
            user: {}
        })
    })

    test('checkAuthToken debe autenticar el usuario si hay un token', async() => { 
        const { data } = await calendarApi.post('/auth', testUserCredentials);
        console.log(data);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async() => {
            await result.current.checkAuthToken();
        });

        const {errorMessage, status, user} = result.current;
        //console.log({errorMessage, status, user});
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'Authenticated',
            user: { name: 'Test User', uid: '64d277aa5d567c660b27f201' }
        })
     })
    
 })
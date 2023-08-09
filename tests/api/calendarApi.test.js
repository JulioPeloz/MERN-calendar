import calendarApi  from "../../src/api/calendarApi"

describe('Pruebas en el calendarApi', () => { 
    test('Debe tener la configuración por defecto', () => { 
        //console.log(calendarApi);
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
     });

    test('Debe tener el x-token en el header de todas las petciones', async() => {
        const token = 'ABC-123-XYZ';

        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');
        //console.log(res);
        
        expect(res.config.headers['x-token']).toBe(token);
     })
 })
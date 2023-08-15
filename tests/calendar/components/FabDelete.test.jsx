import { render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('Pruebas en el <FabDelete/>', () => { 
    test('Debe mostrar el componente correctamente', () => { 
        render(
        <Provider store={store}>
            <FabDelete/>
        </Provider>);
        screen.debug();
     })
 })
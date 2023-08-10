export const initialState = {
    status: "checking",
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {
    status: "Authenticated",
    user: {
        uid: 'abc',
        name: 'Julio'
    },
    errorMessage: undefined,
}

export const notAuthenticatedState = {
    status: "Not-Authenticated",
    user: {},
    errorMessage: undefined,
}
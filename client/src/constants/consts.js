export const PERMISSION = {
    VIEW: 0,
    ADD: 1,
    DELETE : 2,
    UPDATE: 3
}

export const API = {
    generalError: "An error occured please contact support"
}

export const alertMessages = {
    delete: {
        getModelQuestion: (module) => {
            return `Do you confirm to delete this ${module}`;
        },
        getSizeDescription: "By deleting this size, all the prices associate with this size will be deleted and it cannot be recoverd"
    }
}
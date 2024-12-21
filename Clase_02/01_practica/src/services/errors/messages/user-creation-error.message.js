// TODO: To be implemented
export const generateUserErrorInfo = (user) => {
    return `Uno o mas propiedades fueron enviadas incompompletas o no son validas.
        Lista de prodidades requeridas:
        -> first_name: type String, recibido: ${user.first_name}
        -> email: type String, recibido: ${user.email}
`
}


export const generateUserErrorInfoENG = (user) => {
    return `One or more properties were sent incomplete or are not valid.
        List of required properties:
        -> first_name: type String, received: ${user.first_name}
        -> email: type String, received: ${user.email}
`
}


export const generateUserErrorInfoBRA = (user) => {
    return `Uma ou mais propriedades foram enviadas incompletas ou não são válidas.
        Lista de propriedades obrigatórias:
        -> first_name: tipo String, recebido: ${user.first_name}
        -> email: tipo String, recebido: ${user.email}
`
}

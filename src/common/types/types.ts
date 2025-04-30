

export type FieldError = {
    error: string
    field: string
}

export type BasePesponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

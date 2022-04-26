interface IRoomSheet {
    adult: number,
    child: number
}

interface IRoomStore {
    total: number,
    rooms: IRoomSheet[]
}

interface IRoomActions {
    type: string,
    payload: IRoomPayload
}

interface IRoomPayload {
    input: IRoomSheet[],
    isAdult: boolean,
    index: number
}
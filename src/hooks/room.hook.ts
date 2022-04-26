import React, { useReducer } from "react";

export default function useRoomAllocation(roomNumber: number): [IRoomStore, React.Dispatch<IRoomActions>] {
    const roomReducer = (prevState: IRoomStore, action: IRoomActions) => {
        let newState = { ...prevState };

        switch (action.type) {
            case "updateRoom":
                newState.rooms = action.payload.input;

                newState.total = newState.rooms.reduce((acc, item) => {
                    return acc + item.adult + item.child;
                }, 0);

                break
            case "reset":
                const roomArray = [...Array(roomNumber).keys()].map(() => {
                    return {
                        adult: 1,
                        child: 0
                    } as IRoomSheet
                });

                newState = {
                    total: roomNumber,
                    rooms: roomArray
                }
                break
        }
        
        return newState;
    }

    const [roomState, roomDispatch] = useReducer(roomReducer, null, () => {
        const roomArray = [...Array(roomNumber).keys()].map(() => {
            return {
                adult: 1,
                child: 0
            } as IRoomSheet
        });

        const inital: IRoomStore = {
            total: roomNumber,
            rooms: roomArray
        }

        return inital;
    });

    return [roomState, roomDispatch]
}
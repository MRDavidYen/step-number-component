import React, { ChangeEvent, useEffect, useReducer } from "react"
import useRoomAllocation from "./hooks/room.hook"
import InputNumber from "./inputnumber";
import styles from "./style/room.module.css"

function RoomAllocation({ ...settings }: IRoomAllocationProperty) {
    const [roomState, roomDispatch] = useRoomAllocation(settings.room);

    useEffect(() => {
        roomDispatch({
            type: "reset",
            payload: {
                index: 0,
                input: [],
                isAdult: false,
                roomNum: settings.room
            }
        });
    }, [settings.guest, settings.room]);

    const changeGuestNumber = (e: ChangeEvent<HTMLInputElement>, index: number, isAdult: boolean) => {
        let newVal = parseInt(e.target.value);
        let newRoom = [...roomState.rooms];

        if (isAdult) {
            newRoom[index].adult = newVal;
        } else {
            newRoom[index].child = newVal;
        }

        roomDispatch({
            type: "updateRoom",
            payload: {
                index: index,
                input: newRoom,
                isAdult: isAdult,
                roomNum: settings.room
            }
        });

        settings.onChange(newRoom);
    }

    return (
        <div className={`${styles.main}`}>
            <div>房客人數: {`${settings.guest}人 / ${settings.room}房`}</div>
            <div>尚未分配人數：{settings.guest - roomState.total}人</div>
            <div className={`${styles.container}`}>
                {
                    roomState.rooms.map((room: IRoomSheet, index: number) => {
                        return (
                            <div key={index} className={`${styles.container}`}>
                                <div className={`${styles.numb}`}>
                                    <span>大人</span>
                                    <div>
                                        <InputNumber
                                            min={1}
                                            max={4}
                                            disabled={roomState.total >= settings.guest}
                                            name={`room${index + 1}`}
                                            step={1}
                                            value={room.adult}
                                            onChange={(e) => {
                                                if (parseInt(e.target.value) + room.child > 4) {
                                                    e.target.value = (4 - room.child).toString();
                                                }

                                                changeGuestNumber(e, index, true);
                                            }}
                                            onBlur={(e) => {
                                            }}
                                        ></InputNumber>
                                    </div>
                                </div>
                                <div className={`${styles.numb}`}>
                                    <span>小孩</span>
                                    <div>
                                        <InputNumber
                                            min={0}
                                            max={4}
                                            disabled={roomState.total >= settings.guest}
                                            name={`room${index + 1}`}
                                            step={1}
                                            value={room.child}
                                            onChange={(e) => {
                                                if (parseInt(e.target.value) + room.adult > 4) {
                                                    e.target.value = (4 - room.adult).toString();
                                                }

                                                changeGuestNumber(e, index, false);
                                            }}
                                            onBlur={(e) => {
                                            }}
                                        ></InputNumber>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RoomAllocation

interface IRoomAllocationProperty {
    guest: number,
    room: number,
    onChange: (result: IRoomSheet[]) => void
}
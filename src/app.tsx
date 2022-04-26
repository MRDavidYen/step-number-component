import React from "react";
import InputNumber from "./inputnumber";
import RoomAllocation from "./Rooms";

export default function App() {
    return (
        <div>
            <div>
                <InputNumber
                    max={20}
                    min={2}
                    step={3}
                    name={"single"}
                    disabled={false}
                    value={3}
                    onBlur={(e) => {
                        console.log("onblur")
                    }}
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                ></InputNumber>
            </div>
            <div>
                <RoomAllocation
                    guest={9}
                    room={3}
                    onChange={(result) => {
                        console.log(result)
                    }}
                ></RoomAllocation>
            </div>
        </div>
    )
}
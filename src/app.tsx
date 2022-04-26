import React from "react";
import InputNumber from "./inputnumber";

export default function App() {
    return (
        <div>
            <InputNumber
                max={5}
                min={1}
                step={1}
                name={"single"}
                disabled={false}
                value={1}
                onBlur={(e) => {

                }}
                onChange={(e) => {

                }}
            ></InputNumber>
        </div>
    )
}
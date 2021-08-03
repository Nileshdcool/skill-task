import React, { FC } from "react";
import moment from 'moment'

const style = {
    padding: 6,
    backgroundColor: "#fff",
    border: "1px solid #ccc"
};

const CustomTooltip:FC<any> = (props:any) => {
    debugger;
    const { active, payload } = props;
    if (active) {
        const currData = payload && payload.length ? payload[0].payload : null;
        return (
            <div className="area-chart-tooltip" style={style}>
                <p>
                    {currData.createdAt ? moment(currData.createdAt) : " -- "}
                </p>
                {/* <p>
                    {"value : "}
                    <em>{currData ? currData.value : " -- "}</em>
                </p> */}
            </div>
        );
    }

    return null;
};

export default CustomTooltip;

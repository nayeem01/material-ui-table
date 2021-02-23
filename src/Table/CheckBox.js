import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
const CheckBox = ({ index, handleCheckElement, check, id, label }) => {
    return (
        <li>
            <FormControlLabel
                key={index}
                control={
                    <Checkbox
                        checked={check}
                        onChange={handleCheckElement}
                        value={id}
                        color="primary"
                    />
                }
                label={label}
            />
        </li>
    );
};

export default CheckBox;

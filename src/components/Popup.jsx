import * as React from "react";

const Popup = ({doc, show, onClose}) => {
    console.log("show i popup: ", show);
    if(!show) {
        return null;
    }
    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <ul className="popup-options">
                    <li className="option">Copy cell</li>
                    <li className="option">Release container</li>
                    <li className="option">Lock container</li>
                    <li className="option">Set auto lock</li>
                    <li className="option">Accept colli and weight differences</li>
                    <li className="option">Clear accepted differences</li>
                    <li className="option">Modify colli and B/L weight</li> {/* onClick={props.openPopup("modWeight")} ???*/}
                    <li className="option">Modify POD</li>
                    <li className="option">Edit/add container note</li>
                    <li className="option">Edit cust ref note</li>
                    <li className="option">BL consignee and consignor</li>
                    <li className="option">Change status to wait at (5)</li>
                    <li className="option">Change status to locked (7)</li>
                    <li className="option">Change status to done (8nd)</li>
                    <li className="option">Change status to cancel (8nc)</li>
                    <li className="option">Change status to open (201)</li>
                    <li className="option">Change status to error (210)</li>
                    <li className="option">View</li>
                    <li className="option">Compact container no</li>
                </ul>
            </div>
        </div>
    );
};

export default Popup;
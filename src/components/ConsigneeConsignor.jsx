import * as React from "react";

const ConsigneeConsignor = ({BL, folder, onClose}) => {

    return (
        <div className="popup-consign">
            <h2>Consignee and consignor</h2>
            <div>
                <legend>Folder no</legend>
                <div>{folder.folderNo}</div>
            </div>
            <div>
                <legend>Manifest no</legend>
                <div>{folder.manifestNo}</div>
            </div>
            <div>
                <legend>Consignor</legend>
                <div>
                    <div>{BL[1].consignorId}</div>
                    <div>{BL[1].consignor}<br />{BL[1].consignorAddress}<br />{BL[1].consignorCity}</div>
                </div>
            </div>
            <div>
                <legend>Consignee</legend>
                <div>
                    <div>{BL[1].consigneeId}</div>
                    <div>{BL[1].consignee}<br />{BL[1].consigneeAddress}<br />{BL[1].consigneeCity}</div>
                </div>
            </div>
            <div className="ok btn" onClick={onClose}>OK</div>
        </div>
    )
};

export default ConsigneeConsignor;
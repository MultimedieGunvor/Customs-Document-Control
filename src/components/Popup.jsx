import * as React from "react";
import { useState } from "react";
import ModWeight from "./ModWeight";
import ModPod from "./ModPod";
import ConsigneeConsignor from "./ConsigneeConsignor";

const Popup = ({doc, show, onClose, folder}) => {
    const [option, setOption] = useState('popup'); 

    console.log("option: ", option);

    function modWeight() {
        setOption('modWeight');
        console.log('option: ', option);
    };

    function modPod() {
        setOption('modPod');
        console.log('option: ', option);
    };

    function consign() {
        setOption('consign');
        console.log('option: ', option);
    };

    if(!show) {
        return null;
    }

    const Options = () => {
        const actions = [
            ["option", "Copy cell"], ["option", "Release container"], ["option", "Lock container"], ["option", "Set auto lock"], ["option", "Accept colli and weight differences"], ["option", "Clear accepted differences"], ["option clickable", "Modify colli and B/L weight", modWeight], ["option clickable", "Modify POD", modPod], ["option", "Edit/add container note"], ["option", "Edit cust ref note"], ["option", "View consignee and consignor", consign], ["option", "Change status to wait at (5)"], ["option", "Change status to locked (7)"], ["option", "Change status to done (8nd)"], ["option", "Change status to cancel (8nc)"], ["option", "Change status to open (201)"], ["option", "Change status to error (210)"], ["option", "View"], ["option", "Compact container no"]];
        return (
            <ul className="popup-options">
            {actions.map((action, index) => (
                <li key={action[1]+index} className={action[0]} onClick={action[2]}>{action[1]}</li>
            ))}
            </ul>
        );
    };

    return (
        <div className="popup">
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {option === 'popup' ? (
                    <Options />
                    // <ul className="popup-options">
                    //     <li className="option">Copy cell</li>
                    //     <li className="option">Release container</li>
                    //     <li className="option">Lock container</li>
                    //     <li className="option">Set auto lock</li>
                    //     <li className="option">Accept colli and weight differences</li>
                    //     <li className="option">Clear accepted differences</li>
                    //     <li className="option clickable" onClick={modWeight}>Modify colli and B/L weight</li>
                    //     <li className="option clickable" onClick={modPod}>Modify POD</li>
                    //     <li className="option">Edit/add container note</li>
                    //     <li className="option">Edit cust ref note</li>
                    //     <li className="option">View consignee and consignor</li>
                    //     <li className="option">Change status to wait at (5)</li>
                    //     <li className="option">Change status to locked (7)</li>
                    //     <li className="option">Change status to done (8nd)</li>
                    //     <li className="option">Change status to cancel (8nc)</li>
                    //     <li className="option">Change status to open (201)</li>
                    //     <li className="option">Change status to error (210)</li>
                    //     <li className="option">View</li>
                    //     <li className="option">Compact container no</li>
                    // </ul>
                ) : option === 'modWeight' ? (
                    <ModWeight BL={doc} folder={folder} onClose={onClose}/>
                ) : option === 'modPod' ? (
                    <ModPod BL={doc} folder={folder} onClose={onClose}/>
                ) : (
                    <ConsigneeConsignor />
                )}
            </div>
        </div>
    );
};

export default Popup;
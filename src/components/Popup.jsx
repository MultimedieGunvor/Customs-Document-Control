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
            ["option", "Copy cell"], ["option", "Release container"], ["option", "Lock container"], ["option", "Set auto lock"], ["option", "Accept colli and weight differences"], ["option", "Clear accepted differences"], ["option clickable", "Modify colli and B/L weight", modWeight], ["option clickable", "Modify POD", modPod], ["option", "Edit/add container note"], ["option", "Edit cust ref note"], ["option clickable", "View consignee and consignor", consign], ["option", "Change status to wait at (5)"], ["option", "Change status to locked (7)"], ["option", "Change status to done (8nd)"], ["option", "Change status to cancel (8nc)"], ["option", "Change status to open (201)"], ["option", "Change status to error (210)"], ["option", "View"], ["option", "Compact container no"]];
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
                ) : option === 'modWeight' ? (
                    <ModWeight BL={doc} folder={folder} onClose={onClose}/>
                ) : option === 'modPod' ? (
                    <ModPod BL={doc} folder={folder} onClose={onClose}/>
                ) : (
                    <ConsigneeConsignor BL={doc} folder={folder} onClose={onClose}/>
                )}
            </div>
        </div>
    );
};

export default Popup;
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export default function ShowInfo ({info}) {
    const secs = info.etaDate.seconds;
    // console.log("secs type: ", typeof secs);
    const nanosecs = info.etaDate.nanoseconds;
    const eta = new Timestamp(secs, nanosecs);
    const etaDate = eta.toDate().toLocaleDateString();
    const [checked, setChecked] = useState(true);
    const [values, setValues] = useState({cancel: true, notify: true});

    const handleCanceled = () => {
        setChecked(!checked);
        console.log("Checkbox is: ", checked);
        sessionStorage.setItem('cancel', checked);
        window.dispatchEvent(new Event('cancel'));
    };

    const handleNotify = (e) => {
        const toggle = e.target.name;
        let value = values[toggle] === true ? false : true;
        // console.log("value: ", value);
        setValues(existingValues => ({
            ...existingValues,
            [toggle]: value,
        }));
        // console.log("values[toggle] is: ", values[toggle]);
        // console.log("e.target.value is: ", e.target.value);
        // console.log("toggle: ", toggle);
        sessionStorage.setItem(toggle, value);
        // sessionStorage.setItem(e.target.name, e.target.value);
        window.dispatchEvent(new Event(toggle));
        // console.log(sessionStorage);
    };

    const checkType = (a, b) => {
        if (info.type === "import") {
            return a
        } else {
            return b
        }
    };

    function getEDI(obj) {
        const entries = Object.entries(obj);
        const sortedEntries = entries.toSorted();
        return (
            <div>
                {sortedEntries.map((entry) => (
                    <div key={entry[1]}>{entry[1]}</div>
                ))}
            </div>
        )
    };

    const ManifestInfo = () => {
        const Info = [["Folder no", info.folderNo], ["Folder type", info.type], ["Primary MOT", info.primaryMot], ["Call info", info.callInfo === "" ? "No call info" : info.callInfo], ["Terminal LoCode", info.terminalLoCode], ["Terminal ID", info.terminalId], ["ETA date", etaDate], ["Master status", info.status]];
        return (
            <div className="manifest-info">
                {Info.map((item) => (
                    <div className="info" key={item[0]}>
                        <legend>{item[0]}</legend>
                        <div>{item[1]}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="info-box">
            <ManifestInfo />
            <div className="filters">
                <div>
                    <legend>B/L filter</legend>
                    <input placeholder="Which B/L?"></input>
                </div>
                <div>
                    <legend>Container filter</legend>
                    <input placeholder="Which container?"></input>
                </div>
                <div>
                    <legend>View LoCode</legend>
                    <select id="select-locode">
                        <option value="polOrg">Pol Org</option>
                        <option value="pol">Pol</option> {/* Gør til default. Hvis tid: generér dynamisk ud fra keys */}
                        <option value="pod">Pod</option>
                        <option value="podFin">Pod Fin</option> 
                    </select>
                </div>
                <div>
                    <legend>Cust Ref filter</legend>
                    <input placeholder="Which cust ref?"></input>
                </div>
                <div>
                    <legend>{checkType("Consignee filter", "Consignor filter")}</legend>
                    <input placeholder={checkType("Which consignee?", "Which consignor?")}></input>
                </div>
                <div>
                    <legend>View values</legend>
                    <select id="select-values">
                        <option value="container">Container</option>
                        <option value="cdc-bl">CDC B/L</option>
                    </select>
                </div>
            </div>
            <div className="edi-log">
                <div className="edi-name">EDI log</div>
                <div className="edi-content">{getEDI(info.ediLog)}</div> 
            </div>
            <div className="vsa-info" placeholder="VSA info">VSA info</div>
            <div className="toggles">
                <div className="toggle">
                    <label className="toggle-name">Show canceled</label>
                    <label className="switch">
                        <input type="checkbox" id="show-canceled" onChange={handleCanceled}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="toggle">
                    <label className="toggle-name">Show notify</label>
                    <label className="switch">
                        <input type="checkbox" id="notify" name="notify" value={values.notify} onChange={handleNotify}/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
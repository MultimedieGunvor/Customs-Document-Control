import { Timestamp } from "firebase/firestore";

export default function ShowInfo ({info}) {
    const secs = info.etaDate.seconds;
    console.log("secs type: ", typeof secs);
    const nanosecs = info.etaDate.nanoseconds;
    const eta = new Timestamp(secs, nanosecs);
    const etaDate = eta.toDate().toLocaleDateString();

    const checkType = (a, b) => {
        if (info.type === "import") {
            return a
        } else {
            return b
        }
    };

    const ManifestInfo = () => {
        const Info = [["Folder no", info.folderNo], ["Folder type", info.type], ["Primary MOT", info.primaryMot], ["Call info", info.callInfo === "" ? "No call info" : info.callInfo], ["Terminal LoCode", info.terminalLoCode], ["Terminal ID", info.terminalId], ["ETA date", etaDate], ["Master status", info.masterStatus]];
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
                <div>EDI log</div>
                <div>{info.ediLog}</div> {/* Tjek, om den renderer, eller om den skal pilles ved */}
            </div>
            <div className="vsa-info" placeholder="VSA info">VSA info</div>
            <div className="toggles">
                <div className="toggle">
                    <label for="show-canceled">Show canceled</label>
                    <label className="switch">
                        <input type="checkbox" id="show-canceled"/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="toggle">
                    <label for="show-notify">Show notify</label>
                    <label className="switch">
                        <input type="checkbox" id="show-notify"/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
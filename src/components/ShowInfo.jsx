import { Timestamp } from "firebase/firestore";

export default function ShowInfo ({info}) {
    const secs = info.etaDate.seconds;
    const nanosecs = info.etaDate.nanoseconds;
    const eta = new Timestamp(secs, nanosecs);
    const etaDate = eta.toDate().toLocaleDateString();

    return (
        <div className="info-box">
            <div className="manifest-info">
                <div className="info">
                    <legend>Folder no</legend>
                    <div>{info.folderNo}</div>
                </div>
                <div className="info">
                    <legend>Folder type</legend>
                    <div>{info.type}</div>
                </div>
                <div className="info">
                    <legend>Primary MOT</legend>
                    <div>{info.primaryMot}</div>
                </div>
                <div className="info">
                    <legend>Call info</legend>
                    <div>{info.callInfo === "" ? "No call info" : info.callInfo}</div>
                </div>
                <div className="info">
                    <legend>Terminal LoCode</legend>
                    <div>{info.terminalLoCode}</div>
                </div>
                <div className="info">
                    <legend>Terminal ID</legend>
                    <div>{info.terminalId}</div>
                </div>
                <div className="info">
                    <legend>ETA date</legend>
                    <div>{etaDate}</div>
                </div>
                <div className="info">
                    <legend>Master status</legend>
                    <div>{info.status}</div>
                </div>
            </div>
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
                {info.type === "export" ? (
                <div>
                    <legend>Consignor filter</legend>
                    <input placeholder="Which consignor?"></input>
                </div>
                ) : (
                <div>
                    <legend>Consignee filter</legend>
                    <input placeholder="Which consignee?"></input>
                </div>
                )}
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
                <div>Insert EDI log dynamically</div> {/* Generér dynamisk */}
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
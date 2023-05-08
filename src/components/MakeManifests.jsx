import { useNavigate } from "react-router-dom";
export default function MakeManifests ({manifests}) {
    
    function getDate(date) {
        const jsDate = date.toDate();
        // console.log("date ", date);
        return jsDate.toLocaleDateString();
    }

    function getDocsTotal(manifest) {
        const totalDocs = Object.keys(manifest.docs).length;
        return totalDocs;
    }

    const navigate = useNavigate();

    return (
        <div className="manifest-box">
            <div className="header-box">
                <div>Folder no</div> {/* --- Hvis tid: generér dynamisk ud fra manifest keys. F.eks: Object.keys(manifests[0]) ---*/}
                <div>Folder ID</div>
                <div>Date</div>
                <div>Type</div>
                <div>Terminal ID</div>
                <div>Primary MOT</div>
                <div>Status</div>
                <div>Documents</div>
                <div>Ref no</div>
                <div>Call info</div>
                <div>Can read</div>
            </div>
            {manifests.map((manifest) => (
                <div className={`manifests ${manifest.folderNo}-row`}
                key={manifest.id}
                onClick= {() => navigate("/manifest", 
                    {state: manifest})}> 
                    <div>{manifest.folderNo}</div>
                    <div>{manifest.id}</div>
                    <div>{getDate(manifest.date)}</div>
                    <div>{manifest.type}</div>
                    <div>{manifest.terminalId}</div>
                    <div>{manifest.primaryMot}</div>
                    <div>{manifest.status}</div>
                    <div>{getDocsTotal(manifest)}</div>
                    <div>{manifest.refNo}</div>
                    <div>{manifest.callInfo}</div>
                    <div>{manifest.canRead}</div>
                </div>
            ))}
        </div>
    )
}
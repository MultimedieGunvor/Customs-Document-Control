import { useNavigate } from "react-router-dom";
export default function MakeManifests ({manifests}) {
    
    function getDate(date) {
        const jsDate = date.toDate();
        console.log("date ", date);
        return jsDate.toLocaleDateString();
    }

    function getDocsTotal(manifest) {
        const totalDocs = Object.keys(manifest).length;
        return totalDocs-12;
    }

    const navigate = useNavigate();

    return (
        <div className="manifest-box">
            <div className="header-box">
                <div className="folderNo manifest-header">Folder no</div> {/* --- Hvis tid: generér dynamisk ud fra manifest keys. F.eks: Object.keys(manifests[0]) ---*/}
                <div className="folderId manifest-header">Folder ID</div>
                <div className="date manifest-header">Date</div>
                <div className="type manifest-header">Type</div>
                <div className="termId manifest-header">Terminal ID</div>
                <div className="mot manifest-header">Primary MOT</div>
                <div className="status manifest-header">Status</div>
                <div className="docs manifest-header">Documents</div>
                <div className="refNo manifest-header">Ref no</div>
                <div className="callInfo manifest-header">Call info</div>
                <div className="canRead manifest-header">Can read</div>
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
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

    const ManifestHeaders = () => {
        const headers = ["Folder no", "Folder ID", "Date", "Type", "Terminal ID", "Primary MOT", "Status", "Documents", "Ref no", "Call info", "Can read"];
        return (
            <div className="header-box">
            {headers.map((header, index) => (
                <div key={header+index}>{header}</div>
            ))}
            </div>
        );
    };

    return (
        <div className="manifest-box">
            <ManifestHeaders />
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
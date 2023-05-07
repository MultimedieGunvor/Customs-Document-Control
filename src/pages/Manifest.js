import { Link, useLocation } from "react-router-dom";

import ShowDocs from "../components/ShowDocs";
import ShowInfo from "../components/ShowInfo";

export default function ManifestPage() {
    const location = useLocation();
    console.log("location: ", location);
    const {state} = location;
    console.log("state ", state);


    return (
        <div className="manifest-content">
            <Link to="/" className="back-btn">Back to manifest list</Link>
            <ShowInfo info={state} />
            <ShowDocs documents={state} docs={state.docs}/>
            <div className="btm-functions"></div>
        </div>
    );
}
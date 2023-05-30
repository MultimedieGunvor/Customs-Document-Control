import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ShowDocs from "../components/ShowDocs";
import ShowInfo from "../components/ShowInfo";

export default function ManifestPage() {
    const location = useLocation();
    console.log("location: ", location);
    const {state} = location;
    console.log("state ", state);


    return (
        <div className="manifest-content">
            <ToastContainer 
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Link to="/" className="back-btn">Back to manifest list</Link>
            <ShowInfo info={state} />
            <ShowDocs documents={state}/>
            {/* <div className="btm-functions"></div> */}
        </div>
    );
}
import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

window.addEventListener('load', onVrViewLoad);
function onVrViewLoad() {
    var vrView = new VRView.Player('#vrview', {
        video: 'link/to/video.mp4',
        is_stereo: true
    });
}


const Dashboard = ({ secretData }) => (
    <div className="Main">

        <div className="jumbotron">
        <div className="container">

            {/*<div classID="vrview">*/}

                {/*<iframe src="//storage.googleapis.com/vrview/2.0/embed?video=link/to/video.mp4&is_stereo=true">*/}
                {/*</iframe>*/}

            {/*</div>*/}


            <div className="col-md-12">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="video" title="video"  height="315" frameBorder="0" allowFullScreen src={"https://www.youtube-nocookie.com/embed/d_2DtDkmgfk?rel=0&amp;controls=0&amp;showinfo=0"} />

                    </div>
                </div>
            </div>
        </div>
    </div>
);

Dashboard.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default Dashboard;
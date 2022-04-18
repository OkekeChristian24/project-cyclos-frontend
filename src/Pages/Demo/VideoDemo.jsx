import YouTube from "react-youtube";


export default function VideoDemo({videoID, videoTitle}){
    
    return (
        <div className="banner__inner demo-style">
            <div className="banner__inner-video-outer">
                <YouTube
                    videoId={videoID} // defaults -> null
                    className={"banner__inner-video"}
                />
            </div>
            <h6 className="demo_video-title">{videoTitle}</h6>
        </div>
    );
}
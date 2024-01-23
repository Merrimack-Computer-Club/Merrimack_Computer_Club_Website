import React, { useEffect, useState } from "react";
import '../css/stock-video.css';



function StockVideo() {

    const [current_video, setCurrentVideo] = useState(0);
    const video_srcs = [
        '/stock_videos/merrimack-stock-1.mp4',
        '/stock_videos/merrimack-stock-2.mp4'
    ];

    useEffect(() => {
        
    }, [current_video, video_srcs.length]);

    /**
     * Transitions to the next video when a video ends.
     * @param {*} evt Called when the video ends
     */
    function getNextVideo(evt) {
        let video = evt.video;
        setCurrentVideo(c => {
            if(c + 1 >= video_srcs.length) {
                return c = 0;
            } else {
                return c + 1;
            }
        });
    }

  return (

    <video className="video" src={video_srcs[current_video]} onEnded={getNextVideo} autoPlay muted playsInline />

  )
}

export default StockVideo

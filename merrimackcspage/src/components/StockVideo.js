import React, { useEffect, useState } from "react";
import '../css/stock-video.css';

function StockVideo() {

    const [current_video, setCurrentVideo] = useState(0);
    const video_srcs = [
        '/stock_videos/stock-1.mp4',
        '/stock_videos/stock-2.mp4'
    ];

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentVideo(c => {
                if(c + 1 >= video_srcs.length) {
                    return c = 0;
                } else {
                    return c + 1;
                }
            });
        }, 5000);
        return () => {
            window.clearInterval(timer);
          };
      }, [current_video, video_srcs.length]);


  return (

    <video className="video" src={video_srcs[current_video]} autoPlay loop muted playsInline/>

  )
}

export default StockVideo

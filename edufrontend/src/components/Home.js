import './Home.css'
import { Link } from 'react-router-dom'
import test1 from '../assets/test1.mp4';
import React, { useEffect, useRef, useState } from 'react';


const Home = () => {
    const videoRef = useRef(null);
    const [universityName, setUniversityName] = useState('')

    const handleInputChange = (event) =>{
        setUniversityName(event.target.value);
      }
  
      const handleKeyDown = (event) =>{
        if(event.key == "Enter"){
          handleInputChange(event)
        }
      }

    const startVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    useEffect(() => {
        document.querySelector('video').playbackRate = 1.5;
    }, []);


    return(
        <div className='home-container'>
            <h1>Understand your college lectures with AI!</h1>
            <h2>Choose your university</h2>
            <input type="text"
                placeholder='Enter your univeristy'
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={universityName}
                />

            <video ref={videoRef} autoPlay loop muted className='video-element'>
                <source src={test1} type="video/mp4"/>
                Your browser does not support this video tag.
            </video>
        </div>
    )
}

export default Home
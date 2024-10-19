import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

import { zip } from 'lodash';
function Home(){
    
    const [inputValue, setInputValue] = useState(''); 
    const [data, setData] = useState([[],[]]);
    const [isLoading,setLoading]=useState(false)
    
    const {musicName}=useParams();
    const playMusic=async (songName,poster)=>{
        localStorage.setItem('songName',songName)
        localStorage.setItem('image',poster)
  }

    useEffect(() => {
        
        const fetchData = async () => {
            const music = musicName ? decodeURIComponent(musicName) : "Bones";
            setInputValue(music);
            console.log(music);
            const sendData = { input: music };
            
            setLoading(true)
            try {
            const response1 = await axios.post('https://music-app-1.onrender.com/submit', sendData, {
                headers: {
                'Content-Type': 'application/json'
                }
                
            });
            
            setData(response1.data)
            } catch (error) {
            console.error('Error:', error);
            }
            finally {
                setLoading(false);
            }

        }

        fetchData()

      }, [])

      const [names, posters] = data;


    return(
        <div className="spotifyPlaylist p-2 w-full">
                  <h1 className="text-white font-bold px-5">Spotify Playlist</h1>
                  {isLoading ? (
                          <div class="relative left-1/2 w-10 h-10">
                              <div class="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
                              <div class="absolute inset-0 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin-slow"></div>
                          </div>
                  ):<></>}

                  <div className="cardContainer"></div>
                    <div className="o_card flex mt-2 flex-wrap justify-between">
                        {
                            zip(data[0],data[1]).map(([nam,poster],index)=>{
                            return <Link to="/songs"><div key={index} className="card relative p-2 rounded-md mb-3 header hover:bg-[#313131] hover:w-[10.1rem] group" onClick={()=>playMusic(nam,poster)} >
                                    <div  className="play rounded-full w-10 absolute right-4 bottom-10 opacity-0 flex justify-center p-2  bg-green-400 group-hover:opacity-100 transition-opacity duration-1000">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="24" color="#000000" fill="black">
                                            <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <img key={index} src={poster} className='w-full' alt="" />
                                    <h3 className='text-white text-sm h-10 overflow-hidden' key={index}>{nam}</h3>
                                    
                                </div>  </Link>
                            })
                        }
                        
                    </div>

            </div>


    )
}


export default Home

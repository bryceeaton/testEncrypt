import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import {db} from "./firebase-config";
import { collection, getDocs } from 'firebase/firestore';


import lit from './lit.ts';


function App() {


  const [encryptMp3, setEncryptMp3] = useState('');
  const [encryptBase64, setEncryptBase64] = useState('');
  const [song, setSong] = useState([]);
  const [artists, setArtists] = useState([]);
  const artistsRef = collection(db, "artists");


  useEffect(() => {

    const fetchData = async () => {

    const artistData = await getDocs(artistsRef);
    setArtists(artistData.docs.map((doc) => ({...doc.data(), id: doc.id})));

  }
  
  fetchData();
}, []);


const onClick = async (id) => {

  const songsRef = collection(db, "artists", id, "songs");
  const songData = await getDocs(songsRef);
  setSong(songData.docs.map((doc) => ({...doc.data(), id: doc.id})));
  
};

const upload = async(imgURL, mp3URL) => {

async function storeNFT() {

  const url = await fetch(imgURL)
  const imgData = await url.blob()
  const image = new File(
    [imgData],
    'Blue Faces.png',
    {type: 'image/png'}
  );

  const songUrl = await fetch(mp3URL)
  const songData = await songUrl.blob()
  const song = new File(
    [songData],
    'Blue_Faces.mp3',
    {type: 'audio/mpeg'}
  );


  const { encryptedFile, encryptedSymmetricKey } = await lit.encrypt(song);
  console.log(encryptedFile)
  console.log(encryptedSymmetricKey)
}

storeNFT()

};



  return (
    <div className="App">
      <header className="header">
        <h2>Admin Portal</h2>
      </header>
      <div className='content'>
        <div className='table'>
          <h2>Artists</h2>
          {artists.map((artist, id) => {
            return <div key={id} className='artistTable'>
              <p 
              onClick={() => {
              onClick(artist.id)
            }}>
                {artist.id}
              </p>
              </div>
            })}
        </div>
        <div className='songsContent'>
          {song.map((song, id) => {
            return <div key={id} className='songTable'>
              <img className="coverImage" src={song.imgURL} />
              <div className='songInfo'>
              <p>{song.song}</p>
              <a href={song.mp3URL}></a>
                <button type="button" onClick={() => {
              upload(song.imgURL, song.mp3URL)}} >
                  Upload to IPFS
                </button>
              </div>
            </div>
            })}
        </div>
      </div>
    </div>
  );

}

export default App;

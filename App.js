import React from 'react';
import { useState, useEffect } from 'react';
import lit from './lit.ts';

function App() {

const upload = async(imgURL, mp3URL) => {

async function storeNFT() {

  const url = await fetch("file url")
  const imgData = await url.blob()
  const image = new File(
    [imgData],
    'image name',
    {type: 'image/png'}
  );

  const songUrl = await fetch("file url")
  const songData = await songUrl.blob()
  const song = new File(
    [songData],
    'mp3 name',
    {type: 'audio/mpeg'}
  );


  const { encryptedFile, encryptedSymmetricKey } = await lit.encrypt(song);
  console.log(encryptedFile);

storeNFT()
};
  
export default App;

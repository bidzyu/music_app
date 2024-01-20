import { createContext, useEffect, useState } from 'react';
import tracksList from '../assets/tracksList.js';
import genresList from '../assets/genresList.js';
import { AllGenres } from '../assets/genresList.js';

const audio = new Audio();

export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [searchedTrack, setSeacrhedTrack] = useState(''); //val from input search
  const [currTrack, setCurrTrack] = useState(tracksList[0]);
  const [currGenre, setCurrGenre] = useState(AllGenres); //val from select genres
  const [currTracksList, setCurrTracksList] = useState(tracksList); //curr playlist (updating by playclick on pagelist)
  const [pagesState, setPagesState] = useState(pagesInit(tracksList));
  const [winSize, setWinSize] = useState(updWinSize());
  const [showCurrTracksList, setShowCurrTracksList] = useState(false);
  const [shouldPlayNext, setShouldPlayNext] = useState(false);
  const [shouldPlayPrev, setShouldPlayPrev] = useState(false);
  const [audioVolume, setAudioVolume] = useState(10);

  useEffect(() => {
    setPagesState(pagesInit(filterTrackList(searchedTrack)));
  }, [searchedTrack, currGenre]);

  useEffect(() => {
    if (shouldPlayNext) {
      const track = currTracksList.find((t) => t.id === currTrack.id);
      const index = currTracksList.indexOf(track);
      const nextIndex = index + 1;
      const nextTrack = currTracksList[nextIndex]
        ? currTracksList[nextIndex]
        : currTracksList[0];
      audio.src = nextTrack.src;
      audio.currentTime = 0;
      audio.play();
      setCurrTrack(nextTrack);
      setShouldPlayNext(false);
    }
    if (shouldPlayPrev) {
      if (audio.currentTime < 3) {
        const track = currTracksList.find((t) => t.id === currTrack.id);
        const index = currTracksList.indexOf(track);
        const prevIndex = index - 1;
        const nextTrack = currTracksList[prevIndex]
          ? currTracksList[prevIndex]
          : currTracksList[currTracksList.length - 1];
        audio.src = nextTrack.src;
        setCurrTrack(nextTrack);
      }
      audio.currentTime = 0;
      audio.play();
      setShouldPlayPrev(false);
    }
  }, [shouldPlayNext, shouldPlayPrev]);

  const convertVolume = () => audioVolume / 100;

  audio.volume = convertVolume();

  const getCurrTrackTimeObj = () => {
    return {
      currTime: Math.round(audio.currentTime),
      isCurrTrackEnd: audio.currentTime >= audio.duration,
    };
  };

  const setCurrTrackTime = (time) => {
    audio.currentTime = time;
  };

  const handleClickPlayer = (track, fromList = false) => {
    if (currTrack.id === track.id) {
      if (!audio.src) {
        audio.src = currTrack.src;
      }

      if (isPlaying) {
        audio.pause();
        setPlaying(false);
        return;
      } else {
        audio.play();
        setPlaying(true);
        return;
      }
    } else {
      if (fromList) {
        setCurrTracksList(filterTrackList(searchedTrack));
      }

      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();
      setCurrTrack(track);
      setPlaying(true);
    }
  };

  const nextTrack = () => {
    if (!shouldPlayNext) {
      setShouldPlayNext(true);
    }
  };

  const prevTrack = () => {
    if (!shouldPlayPrev) {
      setShouldPlayPrev(true);
    }
  };

  const filterTrackList = (val) => {
    const lowerCaseVal = val.toLowerCase();

    let filtered = tracksList;

    if (genresList.includes(currGenre) && currGenre !== AllGenres) {
      filtered = filtered.filter((track) => track.genre === currGenre);
    }

    filtered = filtered.filter(
      (track) =>
        track.artist.toLowerCase().includes(lowerCaseVal) ||
        track.title.toLowerCase().includes(lowerCaseVal)
    );

    return filtered;
  };

  const toggleShowCurrTracksList = () => {
    setShowCurrTracksList(!showCurrTracksList);
  };

  const pauseTrack = () => {
    audio.pause();
    setPlaying(false);
  };

  function pagesInit(tracks) {
    return {
      currPage: 1,
      totalPages: Math.floor(tracks.length / 10) + 1,
    };
  }

  function updWinSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  window.onresize = () => {
    setWinSize(updWinSize());
  };

  const value = {
    isPlaying,
    currTrack,
    handleClickPlayer,
    audioVolume,
    setAudioVolume,
    getCurrTrackTimeObj,
    setCurrTrackTime,
    nextTrack,
    prevTrack,
    currGenre,
    setCurrGenre,
    filterTrackList,
    searchedTrack,
    setSeacrhedTrack,
    currTracksList,
    toggleShowCurrTracksList,
    showCurrTracksList,
    pauseTrack,
    pagesState,
    setPagesState,
    pagesInit,
    winSize,
  };
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;

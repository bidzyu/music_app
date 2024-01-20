import { IconButton } from '@mui/material';
import {
  PlayCircleOutline,
  PauseCircleOutline,
  SkipPrevious,
  SkipNext,
  FormatListBulleted,
  Undo,
} from '@mui/icons-material';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import style from '../main.module.scss';

const PlayModule = () => {
  const {
    currTrack,
    isPlaying,
    handleClickPlayer,
    nextTrack,
    prevTrack,
    toggleShowCurrTracksList,
    showCurrTracksList,
  } = useContext(AudioContext);

  return (
    <div className={style['flex-row']}>
      <IconButton onClick={prevTrack}>
        <SkipPrevious className={style.lowsize} />
      </IconButton>
      <IconButton onClick={() => handleClickPlayer(currTrack)}>
        {isPlaying ? (
          <PauseCircleOutline className={style.size} />
        ) : (
          <PlayCircleOutline className={style.size} />
        )}
      </IconButton>
      <IconButton onClick={nextTrack}>
        <SkipNext className={style.lowsize} />
      </IconButton>
      <IconButton onClick={toggleShowCurrTracksList}>
        {showCurrTracksList ? (
          <Undo className={style.lowsize} />
        ) : (
          <FormatListBulleted className={style.lowsize} />
        )}
      </IconButton>
    </div>
  );
};

export default PlayModule;

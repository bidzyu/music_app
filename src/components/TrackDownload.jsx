import style from '../main.module.scss';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import { IconButton } from '@mui/material';
import { FileDownload } from '@mui/icons-material';

const TrackDownload = () => {
  const { currTrack, pauseTrack } = useContext(AudioContext);

  const handleClick = () => {
    pauseTrack();
    window.open(currTrack.src, 'popup');
  };

  return (
    <IconButton className={style.download} onClick={handleClick}>
      <FileDownload className={style.size} />
      <span className={style.word}>Download</span>
    </IconButton>
  );
};

export default TrackDownload;

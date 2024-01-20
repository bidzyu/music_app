import { Slider } from '@mui/material';
import style from '../main.module.scss';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

const VolumeController = () => {
  const { audioVolume, setAudioVolume, showCurrTracksList } =
    useContext(AudioContext);

  const handleVolumeChange = (e) => {
    setAudioVolume(e.target.value);
  };

  return (
    <div className={style['flex-row']}>
      <Slider
        className={style['slider-volume']}
        size="small"
        value={audioVolume}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={handleVolumeChange}
        sx={{ color: '#333' }}
      />
      {showCurrTracksList ? <div>{audioVolume}%</div> : null}
    </div>
  );
};

export default VolumeController;

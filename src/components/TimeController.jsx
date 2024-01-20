import style from '../main.module.scss';
import classnames from 'classnames';
import { Slider } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import convertTime from '../utils/convertTime.js';

const TimeController = () => {
  const [currTime, setCurrTime] = useState(0);

  const { currTrack, getCurrTrackTimeObj, setCurrTrackTime, nextTrack } =
    useContext(AudioContext);
  const { duration } = currTrack;

  const convertedDurationTime = convertTime(duration);
  const convertedCurrTime = convertTime(
    currTime < duration ? currTime : duration
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeObj = getCurrTrackTimeObj();

      if (timeObj.isCurrTrackEnd) {
        nextTrack();
      }
      setCurrTime(timeObj.currTime);
    }, 500);

    return () => clearInterval(timerId);
  }, []);

  const getSliderValue = () => {
    return (1000 / duration) * currTime;
  };

  const handleSliderChange = (e) => {
    const val = (duration / 1000) * e.target.value;

    setCurrTrackTime(val);
  };

  return (
    <div className={classnames(style['music-slider'], style['flex-row'])}>
      <div className={style.time}>{convertedCurrTime}</div>
      <Slider
        className={style['slider-duration']}
        value={getSliderValue()}
        min={1}
        max={1000}
        onChange={handleSliderChange}
        sx={{ color: '#333', width: '100%' }}
      />
      <div className={style.time}>{convertedDurationTime}</div>
    </div>
  );
};

export default TimeController;

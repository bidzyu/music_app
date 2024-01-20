import style from '../main.module.scss';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import PlayModule from './PlayModule.jsx';
import classnames from 'classnames';
import TimeController from './TimeController.jsx';

const Playbar = () => {
  const { currTrack, showCurrTracksList, winSize } = useContext(AudioContext);
  const { img, title, artist } = currTrack;

  return (
    <div className={style.playbar}>
      <div className={classnames(style.lblock, style['flex-row'])}>
        <img src={img} alt="" className={style.preview} />
        <div>
          <b className={style.title}>{title}</b>
          <p className={style.artist}>{artist}</p>
        </div>
      </div>
      {winSize.width > 620 ? (
        <div className={classnames(style.cblock, style['flex-row'])}>
          {showCurrTracksList ? null : <TimeController />}
        </div>
      ) : null}
      <div className={style.rblock}>
        <PlayModule />
      </div>
    </div>
  );
};

export default Playbar;

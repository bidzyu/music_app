import style from '../main.module.scss';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import { IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import classnames from 'classnames';
import convertTime from '../utils/convertTime.js';
import TrackDownload from './TrackDownload.jsx';

const Track = (track) => {
  const { id, img, duration, title, artist, genre } = track;
  const { isPlaying, currTrack, handleClickPlayer, showCurrTracksList } =
    useContext(AudioContext);

  const isCurrTrack = currTrack.id === id;
  const convertedDuration = convertTime(duration);

  const MainTrack = () => (
    <div className={style.track}>
      <div className={style.top}>
        <img src={img} className={style.prev} alt="" />
        <div
          className={
            isCurrTrack ? classnames(style.player, style.active) : style.player
          }
        >
          <IconButton
            className={style.btn}
            onClick={() => handleClickPlayer(track, true)}
          >
            {isPlaying && isCurrTrack ? (
              <PauseIcon className={style.size} />
            ) : (
              <PlayArrowIcon className={style.size} />
            )}
          </IconButton>
        </div>
      </div>
      <div
        className={
          isCurrTrack ? classnames(style.playing, style.bottom) : style.bottom
        }
      >
        <div>
          <b className={style.title}>{title}</b>
          <p className={style.artist}>{artist}</p>
        </div>
        <div className={classnames(style.genre, style['flex-row'])}>
          <p className={style.bold}>{genre}</p>
          <p>{convertedDuration}</p>
        </div>
      </div>
    </div>
  );

  const PlaylistTrack = () => (
    <div
      className={
        isCurrTrack
          ? classnames(style.track, style['active-track'])
          : style.track
      }
    >
      <div
        className={
          isCurrTrack ? classnames(style.player, style.active) : style.player
        }
      >
        <IconButton
          className={style.btn}
          onClick={() => handleClickPlayer(track, true)}
        >
          {isPlaying && isCurrTrack ? (
            <PauseIcon className={style.size} />
          ) : (
            <PlayArrowIcon className={style.size} />
          )}
        </IconButton>
      </div>
      <img src={img} alt="" />
      <div
        onClick={() => handleClickPlayer(track, true)}
        className={style['author-info']}
      >
        <b className={style.title}>{title}</b>
        <p className={style.artist}>{artist}</p>
      </div>
      <div className={style.genre}>
        <b>{genre}</b>
      </div>
      <TrackDownload />
    </div>
  );

  return <>{showCurrTracksList ? PlaylistTrack() : MainTrack()}</>;
};

export default Track;

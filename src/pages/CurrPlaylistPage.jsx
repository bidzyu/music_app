import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import Track from '../components/Track.jsx';
import style from '../main.module.scss';

const CurrPlaylistPage = () => {
  const { currTracksList } = useContext(AudioContext);

  return (
    <div className={style['curr-playlist']}>
      {currTracksList.map((track) => (
        <Track key={track.id} {...track} />
      ))}
    </div>
  );
};

export default CurrPlaylistPage;

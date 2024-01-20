import Search from '../components/Search.jsx';
import TracksPages from './TracksPages.jsx';
import CurrPlaylistPage from './CurrPlaylistPage.jsx';
import PlayController from '../components/AudioController.jsx';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import style from '../main.module.scss';

const MainPage = () => {
  const { showCurrTracksList } = useContext(AudioContext);
  return (
    <div className={showCurrTracksList ? style['relative-np'] : style.relative}>
      {showCurrTracksList ? <PlayController /> : <Search />}
      {showCurrTracksList ? <CurrPlaylistPage /> : <TracksPages />}
    </div>
  );
};

export default MainPage;

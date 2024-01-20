import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import Track from '../components/Track.jsx';
import NavPages from '../components/NavPages.jsx';
import style from '../main.module.scss';

const TracksPages = () => {
  const { filterTrackList, searchedTrack, pagesState } =
    useContext(AudioContext);
  

  const getIndexes = (currPage) => {
    return {
      start: currPage * 10 - 10,
      end: currPage * 10 - 1,
    };
  };

  const ind = getIndexes(pagesState.currPage);

  const filteredTracksList = filterTrackList(searchedTrack);

  const currPageTrackList = [];

  for (let i = ind.start; i <= ind.end; i++) {
    const track = filteredTracksList[i];

    if (!track) break;

    currPageTrackList.push(<Track key={i} {...track} />);
  }

  return (
    <div>
      <div className={style.list}>{currPageTrackList}</div>
      {pagesState.totalPages > 1 ? <NavPages /> : null}
    </div>
  );
};

export default TracksPages;

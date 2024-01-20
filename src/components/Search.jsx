import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import style from '../main.module.scss';
import classnames from 'classnames';
import SelectVariants from './SelectVariants.jsx';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';

const Search = () => {
  const { searchedTrack, setSeacrhedTrack, winSize } = useContext(AudioContext);

  const handleInputChange = (e) => {
    if (e === null) {
      setSeacrhedTrack('');
      return;
    }

    setSeacrhedTrack(e.target.value);
  };

  const clearHandler = () => {
    setSeacrhedTrack('');
  };

  function setPlh() {
    return winSize.width < 450 ? 'Search...' : 'Search Tracks & Artists';
  }

  return (
    <div className={style.search}>
      <div className={style['search-field']}>
        <TextField
          size="small"
          value={searchedTrack}
          onChange={handleInputChange}
          placeholder={setPlh()}
          sx={{
            m: 1,
            minWidth: 120,
            width: '100%',
          }}
          variant="standard"
        />
        {searchedTrack !== '' ? (
          <IconButton className={style['clear-btn']} onClick={clearHandler}>
            <Clear className={classnames(style.icon, style['icon-clear'])} />
          </IconButton>
        ) : (
          <SearchIcon
            className={classnames(style.icon, style['icon-search'])}
          />
        )}
      </div>
      <div className={style['select-field']}>
        <SelectVariants />
      </div>
    </div>
  );
};

export default Search;

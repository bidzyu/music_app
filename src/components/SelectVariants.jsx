import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import genresList from '../assets/genresList.js';
import { AllGenres } from '../assets/genresList.js';

const SelectVariants = () => {
  const { currGenre, setCurrGenre } = useContext(AudioContext);

  const handleChange = (event) => {
    const val = event.target.value;

    if (genresList.includes(val)) {
      setCurrGenre(val);
      return;
    }

    setCurrGenre(AllGenres);
  };

  return (
    <FormControl
      size="small"
      variant="standard"
      sx={{
        m: 1,
        minWidth: 120,
        width: '100%',
      }}
    >
      <Select value={currGenre} onChange={handleChange}>
        <MenuItem value={AllGenres}>Select Genres</MenuItem>
        {genresList.map((genre) => (
          <MenuItem value={genre} key={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectVariants;

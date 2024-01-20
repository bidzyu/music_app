import tracksList from './tracksList.js';

const getAllGenres = (list) => {
  return list.reduce((res, item) => {
    if (!item.genre || res.includes(item.genre)) return res;

    res.push(item.genre);
    return res;
  }, []);
};

export const AllGenres = 'All';

export default getAllGenres(tracksList).sort();

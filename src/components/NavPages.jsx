import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';
import { ButtonGroup, Button } from '@mui/material';
import PageLink from './PageLink.jsx';
import style from '../main.module.scss';

const NavPages = () => {
  const { pagesState, setPagesState } = useContext(AudioContext);

  const setPage = (page) => {
    setPagesState({ ...pagesState, currPage: page });
  };

  const nextPage = () => {
    setPage(pagesState.currPage + 1);
  };

  const prevPage = () => {
    setPage(pagesState.currPage - 1);
  };

  const NextPageBtn = () => {
    if (pagesState.currPage >= pagesState.totalPages) {
      return null;
    }

    return (
      <Button className={style['page-link']} onClick={nextPage}>
        {'>'}
      </Button>
    );
  };

  const PrevPageBtn = () => {
    if (pagesState.currPage <= 1) {
      return null;
    }

    return (
      <Button className={style['page-link']} onClick={prevPage}>
        {'<'}
      </Button>
    );
  };

  const PagesBtns = () => {
    const currPage = pagesState.currPage;
    const firstPage = 1;
    const lastPage = pagesState.totalPages;

    const allPages = [];

    if (currPage > firstPage && currPage - 1 > firstPage) {
      allPages.push(1, '...');
    } else if (currPage > firstPage) {
      allPages.push(1);
    }
    allPages.push('' + currPage);
    if (currPage < lastPage && currPage + 1 < lastPage) {
      allPages.push('...', lastPage);
    } else if (currPage < lastPage) {
      allPages.push(lastPage);
    }

    return allPages.map((pageLink, ind) => (
      <PageLink key={ind} val={pageLink} setPage={setPage} />
    ));
  };

  return (
    <ButtonGroup
      className={style['nav-pages']}
      sx={{ color: '#333' }}
      orientation="horizontal"
      size="large"
      variant="filled"
      aria-label="text button group"
    >
      {PrevPageBtn()}
      {PagesBtns()}
      {NextPageBtn()}
    </ButtonGroup>
  );
};

export default NavPages;

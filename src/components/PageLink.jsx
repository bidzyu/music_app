import { Button } from '@mui/material';
import style from '../main.module.scss';

const PageLink = (props) => {
  const val = props.val;

  return (
    <>
      {typeof val === 'string' ? (
        <Button className={style['page-link']} disabled>
          {val}
        </Button>
      ) : (
        <Button
          className={style['page-link']}
          onClick={() => props.setPage(val)}
        >
          {val}
        </Button>
      )}
    </>
  );
};

export default PageLink;

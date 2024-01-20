import TimeController from './TimeController.jsx';
import VolumeController from './VolumeController.jsx';
import style from '../main.module.scss';
import classnames from 'classnames';

const PlayController = () => {
  return (
    <div className={style['play-controller']}>
      <div
        className={classnames(
          style['flex-row'],
          style['play-controller-container']
        )}
      >
        <TimeController />
        <VolumeController />
      </div>
    </div>
  );
};

export default PlayController;

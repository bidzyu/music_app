export default (allSec) => {
  let min = Math.floor(allSec / 60);
  let sec = allSec - min * 60;

  min = min > 9 ? '' + min : '0' + min;
  sec = sec > 9 ? '' + sec : '0' + sec;

  return `${min}:${sec}`;
};


// time setup function;
const getTimeString = (time) => {
    const hours = parseInt(time / 3600)
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    return `${hours} hr ${minute} min`;
}

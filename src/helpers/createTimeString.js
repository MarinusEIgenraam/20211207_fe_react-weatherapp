export default function createTimeString(moment) {
    const day = new Date(moment * 1000);

    return day.toLocaleTimeString('nl-NL',{hour: '2-digit', minute: '2-digit'});
};
/**
 * 2022-09-05T15:18:20.559026+03:00 => 2022-09-05 15:18:20
 */
export function offsetDateTimeToDateTime(origin) {
    if (!origin) {
        return ''
    }
    return origin.substring(0, 19).replace('T', ' ');
}
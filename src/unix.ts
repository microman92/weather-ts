export function unix(dt: number, type: string) {
    const seconds: number = dt * 1000
    const data = new Date(seconds)
    let result =
        type == 'day' ? data.toLocaleString('ru-Ru', { day: 'numeric' }) :
            type == 'mounth' ? data.toLocaleString('ru-Ru', { month: 'long' }) :
                type == 'weekDay' ? data.toLocaleString('ru-Ru', { weekday: 'long' }) : ''
    return result
}

export function getHours(dt: number): number {
    const seconds: number = dt * 1000;
    const date = new Date(seconds);
    return date.getUTCHours();
}

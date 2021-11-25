export const weights = {
    move: 0.3,
    bomb: 0.6,
    misses: 0.4,
    headshot: 0.85,
    body: 0.65,
};

export const isSpeedType = (type) =>{
    return type?.toLowerCase() === 'move' || type?.toLowerCase() === 'bomb';
}

export const grade = {
    move: (value) => {
        if (value < 105) return 100;
        if (value >= 105 && value < 250) return 70;
        return 0;
    },
    bomb: (value) => (value < 40000 ? 100 : 0),
    misses: (value) => {
        if (value < 60) return 100;
        if (value >= 60 && value < 400) return 70;
        return 0;
    },
    headshot: () => 100,
    body: () => 80,
};
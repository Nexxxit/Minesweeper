import { useEffect, useState, memo } from "react";

interface BombCounter {
    bombCount: number;
    flagsSet: number;
}

export default memo (function BombCounter({bombCount, flagsSet}: BombCounter) {
    const [bombsLeft, setBombsLeft] = useState<number>(bombCount);

    useEffect(() => {
        calculateBombs();
    }, [bombCount, flagsSet])

    const calculateBombs = () => {
       setBombsLeft(bombCount - flagsSet);
    }

    return (
        <p className="text-white font-bold text-xl sm:text-3xl">💣{bombsLeft}</p>
    );
})
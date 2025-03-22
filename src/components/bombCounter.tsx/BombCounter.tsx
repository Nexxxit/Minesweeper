import { useEffect, useState } from "react";

interface BombCounter {
    bombCount: number;
    flagsSet: number;
}

export default function BombCounter({bombCount, flagsSet}: BombCounter) {
    const [bombsLeft, setBombsLeft] = useState<number>(bombCount);

    useEffect(() => {
        calculateBombs();
    }, [bombCount, flagsSet])

    const calculateBombs = () => {
       setBombsLeft(bombCount - flagsSet);
    }

    return (
        <p>💣{bombsLeft}</p>
    );
}
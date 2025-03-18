import Button from "../button/Button";

export default function Menu() {

    return(
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="mb-20">
                <p className="text-7xl text-yellow-300 font-bold">Minesweeper</p>
            </div>
            <Button btnText="Начать игру" to="/game"/>
            <Button btnText="Таблица лидеров" to="leaderboard"/>
            <Button btnText="Настройки" to="/settings"/>
        </div>
    );
}
import BarChart from "../BarChart/BarChart";
import PieChart from "../PieChart/PieChart";
import "./Statistic.css";

export default function Statistic() {
    return (
        <div className="statistic__container">
            <h1 className="statistic__title">Статистика использования конвертора</h1>
            <div className="statistic__content">
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
}
import {ChartPieDonutText} from "@/components/dashboard/DashboardPieChart";
import {ChartAreaDefault} from "@/components/dashboard/DashboardOverview";

export default function DashboardGraph() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <div className="col-span-2">
                <ChartAreaDefault/>
            </div>
            <div className="col-span-1">
                <ChartPieDonutText/>
            </div>
        </div>
    );
}
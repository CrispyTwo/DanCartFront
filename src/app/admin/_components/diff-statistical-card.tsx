import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

type DiffStatCardProps = {
  cardTitle: string;
  prev: number;
  curr: number;

  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  periodLabel?: string;
};

const DiffStatCard: React.FC<DiffStatCardProps> = ({cardTitle, prev, curr, Icon, iconClassName, periodLabel = "month" }) => {
  const diff = curr - prev;
  let ChangeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> = Minus;
  let changeClass = "text-gray-500";
  let percentLabel = "0%";

  if (prev === 0) {
    if (curr === 0) {
      ChangeIcon = Minus;
      changeClass = "text-gray-500";
      percentLabel = "0%";
    } else {
      ChangeIcon = ArrowUpRight;
      changeClass = "text-green-600";
      percentLabel = "New";
    }
  } else {
    const percent = (diff / prev) * 100;
    const absPercent = Math.abs(percent);
    const rounded = Math.round(absPercent * 10) / 10;
    const sign = percent > 0 ? "+" : percent < 0 ? "-" : "";
    percentLabel = `${sign}${rounded}%`;

    if (percent > 0) {
      ChangeIcon = ArrowUpRight;
      changeClass = "text-green-600";
    } else if (percent < 0) {
      ChangeIcon = ArrowDownRight;
      changeClass = "text-red-600";
    } else {
      ChangeIcon = Minus;
      changeClass = "text-gray-500";
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <Icon className={iconClassName} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{curr}</div>
          <div className={`flex items-center text-xs ${changeClass}`}>
            <ChangeIcon className="mr-1 h-3 w-3" />
            {`${percentLabel} from previous ${periodLabel}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiffStatCard;

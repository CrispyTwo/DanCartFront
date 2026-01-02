import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type StatCardProps = {
  cardTitle: string;
  count: number;

  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
};

const StatCard: React.FC<StatCardProps> = ({cardTitle, count, Icon, iconClassName }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <Icon className={iconClassName} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

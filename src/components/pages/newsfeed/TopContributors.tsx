import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Award } from "lucide-react";

const TopContributors: React.FC = () => {
  return (
    <Card className="bg-dark-200 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Top Contributors
        </h3>
        {/* <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={`/api/placeholder/${150 + index}/150`} />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">
                  User {index + 1}
                </p>
                <p className="text-xs text-gray-400">1.2K followers</p>
              </div>
              <Badge className="ml-auto bg-primary-500/10 text-primary-500">
                <Award className="w-3 h-3 mr-1" />
                Top
              </Badge>
            </div>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
};

export default TopContributors;

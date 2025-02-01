import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { TrendingUp } from "lucide-react";

const TrendingTopics: React.FC = () => {
  return (
    <Card className="bg-dark-200 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Trending Topics
        </h3>
        {/* <div className="space-y-4">
          {["#Crypto", "#NFT", "#DeFi", "#Web3"].map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                <span className="text-gray-300 hover:text-primary-500 cursor-pointer">
                  {topic}
                </span>
              </div>
              <span className="text-sm text-gray-400">2.5K posts</span>
            </div>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;

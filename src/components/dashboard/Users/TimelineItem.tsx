"use client"

import React from 'react';
import { cn } from '@/lib/utils';

type TimelineItem = {
  id: string;
  time: string;
  date: string;
  title: string;
  actor?: string;
};

type TimelineGroup = {
  date: string;
  items: TimelineItem[];
};

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const ActivityTimeline: React.FC<TimelineProps> = ({ items, className }) => {
  // Group items by date
  const groupedItems = items.reduce((groups: TimelineGroup[], item) => {
    const existingGroup = groups.find(group => group.date === item.date);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      groups.push({ date: item.date, items: [item] });
    }
    return groups;
  }, []);

  return (
    <div className={cn("w-full space-y-8", className)}>
      {groupedItems.map((group, groupIndex) => (
        <div key={group.date} className="relative">
            <div className='absolute top-2 h-full border-r border-r-black translate-x-2'></div>
          {/* Date Label with Primary Dot */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Large primary dot for date */}
              <div className="w-4 h-4 rounded-full bg-black"></div>
              {/* Vertical line spanning all items */}
              {/* {group.items.length > 0 && (
                <div className="absolute left-2 top-4 w-[2px] h-[calc(100%+2rem)] bg-gray-200 -translate-x-1/2" />
              )} */}
            </div>
            <span className="text-sm font-medium text-primary">
              {group.date}
            </span>
          </div>

          {/* Timeline Items */}
          <div className="mt-4 ml-[7px] space-y-6">
            {group.items.map((item, itemIndex) => (
              <div key={item.id} className="relative pl-8">
                {/* Small dot for each item */}
                {/* <div className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-gray-300 -translate-x-[3px]" /> */}
                
                {/* Time and Content */}
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    {item.time}
                  </span>
                  <p className="text-sm text-gray-700">
                    {item.title}
                    {item.actor && (
                      <span className="text-gray-500">
                        {" "}by {item.actor}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
import React from 'react';
import { Trophy } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type User = {
    id: string;
    name: string;
    accountId: string;
    avatar: string;
    points: number;
};

type LeaderboardProps = {
    users: User[];
    title?: string;
};

const Leaderboard: React.FC<LeaderboardProps> = ({
    users,
    title = "Leaderboard"
}) => {
    return (
        <div className="w-full max-w-5xl bg-white rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <img
                    src="/icons/REWARD1.svg"
                    alt="Trophy"
                    className="w-12 h-12 ml-2"
                />
            </div>

            {/* Users List */}
            <ScrollArea className="space-y-4 h-[500px]">
                {users.map((user, index) => {
                    const isTopThree = index < 3;
                    const bgColor = isTopThree ? 'bg-blue-50' : 'bg-gray-50';
                    const avatarBgColor = isTopThree ? 'bg-blue-100' : 'bg-gray-200';

                    return (
                        <div
                            key={user.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                {/* User Avatar */}
                                <div className={`w-10 h-10 rounded-full overflow-hidden ${avatarBgColor} flex items-center justify-center`}>
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                </div>

                                {/* User Details */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {user.accountId}
                                    </p>
                                </div>
                            </div>

                            {/* Points */}
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                <span className="text-sm text-gray-600">
                                    {user.points} pts
                                </span>
                            </div>
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    );
};


export default Leaderboard
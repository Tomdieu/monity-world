import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type UserType = {
    id: number;
    name: string;
    points: number;
    avatar: string;
};

type TopActiveUsersProps = {
    title: string;
    users: UserType[];
    onLeaderboardClick: () => void;
};

const TopActiveUsers: React.FC<TopActiveUsersProps> = ({
    title,
    users,
    onLeaderboardClick,
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* Header */}
            <div className="flex items-center justify-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <Image
                    src="/icons/REWARD1.svg"
                    alt="Trophy"
                    className="w-8 h-8 ml-2"
                    width={32}
                    height={32}
                />
            </div>

            <div className="bg-white rounded-md py-5 w-full shadow-md">
                {/* User List */}
                <div className="flex items-center justify-center gap-12">
                    {/* Second User */}
                    {users[1] && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 relative rounded-full bg-blue-900 border-4 border-primary flex items-center justify-center">
                                <Image
                                    src={users[1].avatar}
                                    alt={users[1].name}
                                    className="w-12 h-12 rounded-full"
                                    width={48}
                                    height={48}
                                />
                                <span className="absolute -bottom-3 text-xs mt-1 p-1 text-white bg-primary rounded-full px-2">
                                    2
                                </span>
                            </div>
                            <div className="flex items-center flex-col">
                                <p className="text-sm font-medium mt-2">{users[1].name}</p>
                                <div className="flex items-center gap-1">
                                    <span className="bg-orange-300 p-1 rounded-full w-3 h-3"></span>
                                    <p className="text-xs text-gray-600">{users[1].points} pts</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* First User */}
                    {users[0] && (
                        <div className="flex flex-col items-center relative gap-5">
                            <div className="w-20 h-20 rounded-full bg-blue-900 border-4 border-primary flex items-center justify-center relative">
                                <Image
                                    src={users[0].avatar}
                                    alt={users[0].name}
                                    className="w-16 h-16 rounded-full"
                                    width={64}
                                    height={64}
                                />
                                <span className="absolute -bottom-3 text-xs mt-1 p-1 text-white bg-red-500 rounded-full px-2.5">
                                    1
                                </span>
                            </div>
                            <Image
                                src="/icons/First.svg"
                                alt="Crown"
                                width={24}
                                height={24}
                                className="mt-2 absolute -top-5 left-4 size-7"
                            />
                            <div className="flex items-center flex-col">
                                <p className="text-base font-medium mt-2">{users[0].name}</p>
                                <div className="flex items-center gap-1">
                                    <span className="bg-orange-300 p-1 rounded-full w-3 h-3"></span>
                                    <p className="text-xs text-gray-600">{users[0].points} pts</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Third User */}
                    {users[2] && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative w-16 h-16 rounded-full bg-blue-900 border-4 border-primary flex items-center justify-center">
                                <Image
                                    src={users[2].avatar}
                                    alt={users[2].name}
                                    className="w-12 h-12 rounded-full"
                                    width={48}
                                    height={48}
                                />
                                <span className="absolute -bottom-3 text-xs mt-1 p-1 text-white bg-primary rounded-full px-2">
                                    3
                                </span>
                            </div>
                            <div className="flex items-center flex-col">
                            <p className="text-sm font-medium mt-2">{users[2].name}</p>
                            <div className="flex items-center gap-1">
                                <span className="bg-orange-300 p-1 rounded-full w-3 h-3"></span>
                                <p className="text-xs text-gray-600">{users[2].points} pts</p>
                            </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Leaderboard Button */}
                <div className="mt-6 flex justify-center">
                    <Button
                        size="lg"
                        onClick={onLeaderboardClick}
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/85 transition"
                    >
                        Go to Leaderboard <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TopActiveUsers;
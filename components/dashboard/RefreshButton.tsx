import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
    onRefresh: () => void;
    isLoading?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isLoading = false }) => {
    return (
        <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isLoading ? 'animate-pulse' : ''
            }`}
        >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
    );
};

export default RefreshButton;

'use client';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'purple' | 'blue' | 'green' | 'pink';
}

export default function LoadingSpinner({ size = 'md', color = 'purple' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const colorClasses = {
        purple: 'border-purple-500',
        blue: 'border-blue-500',
        green: 'border-green-500',
        pink: 'border-pink-500',
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
            ></div>
        </div>
    );
}

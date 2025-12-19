import Image from 'next/image';

export function Logo() {
    return (
        <div className="flex items-center gap-2 font-bold text-lg select-none">
            <Image
                src="/logo.jpg"
                alt="VectraDocs"
                width={30}
                height={30}
                className="rounded-lg" // Adding rounded corners as it looks better for app icons
            />
            <span className="text-zinc-900 dark:text-zinc-100">VectraDocs</span>
        </div>
    );
}

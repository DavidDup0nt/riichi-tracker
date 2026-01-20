import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../hooks/useTheme';
import { TileCode } from '../lib/hand';

export function svgForTile(tile: TileCode): readonly [string, string] {
	const base = import.meta.env.BASE_URL;
	const t = (name: string) => [`${base}tiles/light/${name}.svg`, `${base}tiles/dark/${name}.svg`] as const;
	switch (tile) {
		case '1z':
			return t('Ton');
		case '2z':
			return t('Nan');
		case '3z':
			return t('Shaa');
		case '4z':
			return t('Pei');
		case '5z':
			return t('Haku');
		case '6z':
			return t('Hatsu');
		case '7z':
			return t('Chun');
		default: {
			const suit = tile[1] === 'm' ? 'Man' : tile[1] === 'p' ? 'Pin' : 'Sou';
			const num = tile[0] === '0' ? '5-Dora' : tile[0];
			return t(suit + num);
		}
	}
}

export function shortForTile(tile: TileCode): [string, 'base' | 'blue' | 'green' | 'red'] {
	switch (tile) {
		case '1z':
			return ['東', 'blue'];
		case '2z':
			return ['南', 'blue'];
		case '3z':
			return ['西', 'blue'];
		case '4z':
			return ['北', 'blue'];
		case '5z':
			return [' ', 'base'];
		case '6z':
			return ['發', 'green'];
		case '7z':
			return ['中', 'red'];
		default: {
			const suit = tile[1] === 'm' ? 'red' : tile[1] === 'p' ? 'blue' : 'green';
			const num = tile[0] === '0' ? '5' : tile[0];
			return [num, suit];
		}
	}
}

//DDA 
export function letterForTile(tile: TileCode): [string, 'base' | 'blue' | 'green' | 'red'] {
	switch (tile) {
		case '1z':
			return ['E', 'blue'];
		case '2z':
			return ['S', 'blue'];
		case '3z':
			return ['W', 'blue'];
		case '4z':
			return ['N', 'blue'];
		case '5z':
			return ['Wh', 'red'];
		case '6z':
			return ['G', 'red'];
		case '7z':
			return ['R', 'green'];
		default: {
			const suit = tile[0] === '0' ? 'green' : 'red';
			const num = tile[0] === '0' ? '5' : tile[0];
			return [num, suit];
		}
	}
}

export default function Tile({ tile, small = false }: { tile: TileCode | '00'; small?: boolean }) {
	const theme = useTheme();
	const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

	if (small && !isLg) {
		const [text, color] = tile === '00' ? ([' ', 'base'] as const) : shortForTile(tile);
		return (
			<div
				className={clsx(
					'h-8 w-6 min-w-[1.5rem] lg:h-16 lg:w-12 lg:min-w-[3rem] flex flex-col justify-center items-center text-lg lg:text-3xl font-bold select-none',
					color === 'red'
						? 'text-red-600 dark:text-red-700'
						: color === 'green'
						? 'text-green-700 dark:text-green-800'
						: color === 'blue'
						? 'text-blue-800 dark:text-blue-900'
						: '',
				)}
			>
				{text}
			</div>
		);
	}
	const file = (tile === '00' ? svgForTile('5z') : svgForTile(tile))[theme === 'dark' ? 1 : 0];
	const [text, color] = tile === '00' ? ([' ', 'base'] as const) : letterForTile(tile);
	return (	
		<div className="relative inline-block">
		  <img
			src={file}
			className={clsx(
			  small
				? 'h-16 w-12 min-w-[3rem] p-2'
				: 'h-16 w-12 min-w-[3.75rem] lg:h-20 lg:w-[3.75rem] lg:min-w-[3.75rem] p-2',
			  'rounded-xl'
			)}
		  ></img>

		 
			<span
			  className={clsx(
				'absolute top-1 right-1 text-sm font-bold text-right',
				'px-1 rounded',
					'[-webkit-text-stroke:0.25px_white] dark:[-webkit-text-stroke:0.25px_black]',
					color === 'red'
						? 'text-red-600 dark:text-red-700'
						: color === 'green'
						? 'text-black dark:text-gray-100'
						: color === 'blue'
						? 'text-blue-800 dark:text-blue-900'
						: ''
			  )}
			>
				{text}
			</span>
		  
		</div>

	);
}

export function Placeholder() {
	return (
		<div className="h-16 w-12 min-w-[3rem] lg:h-20 lg:w-[3.75rem] lg:min-w-[3.75rem] p-2 rounded-xl border-2 border-black dark:border-white border-dashed"></div>
	);
}

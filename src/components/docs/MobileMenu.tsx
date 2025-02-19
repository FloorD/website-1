import React from 'react';
import Container from '../Container';
import type { SideBarSection } from '../../types';
import { styles } from '../../util';
import SideBarItem from './SideBarItem';

interface Props {
	sideBarMenuSections: SideBarSection[];
	isNestedSideBar: boolean;
	currentPath: string;
}

const MobileMenu: React.FC<Props> = ({
	sideBarMenuSections,
	isNestedSideBar,
	currentPath,
}) => {
	const renderItems = (section: SideBarSection) => {
		const items = section.items.map((item) => {
			return (
				<SideBarItem
					key={item.slug}
					isRootNested={false}
					item={item}
					currentPath={currentPath}
				/>
			);
		});

		return items;
	};
	return (
		<div className='bg-offBlack min-[1000px]:hidden fixed z-[6] w-screen h-screen overflow-y-scroll'>
			<Container styles='pb-16 px-[32px] overflow-y-scroll'>
				<div className='bg-gradient-to-b fixed from-offBlack to-transparent h-4 w-full z-20 top-[70px]'></div>
				<div className='mt-[120px]'>
					<a
						href='/docs'
						className='font-secondary font-extrabold flex items-center gap-4'
					>
						<img src='/icons/home.svg' alt='home' width={20} />
						Home
					</a>
					<div className='pb-12 z-4'>
						{sideBarMenuSections.map((section, index) => {
							const isBeyondFirstSection =
								isNestedSideBar && index > 0;
							return (
								<div
									className='flex flex-col'
									key={section.label}
								>
									<div className='my-6'>
										<div className='h-px w-full bg-[#EAEAEA33]'></div>
									</div>
									<div className='flex items-center gap-2'>
										{!isBeyondFirstSection && (
											<img
												src={
													section?.icon
														? `/icons/${section.icon}`
														: '/icons/docsElephant.svg'
												}
												alt={section.label}
												width={18}
												height={18}
											/>
										)}
										<span
											className={styles(
												'text-[15px]',
												isBeyondFirstSection
													? 'text-white uppercase text-xs'
													: 'text-neon',
											)}
										>
											{section.label}
										</span>
									</div>
									<ul className='mt-4 flex flex-col gap-2'>
										{renderItems(section)}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default MobileMenu;

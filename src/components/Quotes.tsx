import 'swiper/css';
import '../styles/swiper.css';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import Container from './Container';
import { styles } from '../util';

export interface QuoteData {
	name?: string;
	role?: string;
	company?: string;
	quote: string;
	logoUrl: string;
}

const quotes: QuoteData[] = [
	{
		name: 'Cody Hanson',
		role: 'Engineering Manager',
		company: 'Arch',
		quote: "Tembo is a foundational part of our platform. We've been able to effortlessly provision, manage, and scale a fleet of databases to run a diverse array of workloads without having to hire a dedicated postgres expert to our team.",
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'John Madrak',
		role: 'Founder',
		company: 'Waddling Technology',
		quote: "We like that 'limits' are only tied to the provisioned specs, not arbitrary decisions made by the provider. The automated backup system helps us avoid the stress of finding a reliable backup solution ourselves and the support of all Postgres extensions make this a long-term solution for us. ",
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'Twitter User',
		role: 'Machine Learning Engineer',
		company: '',
		quote: 'Maaahn...so excited for @tembo_io🔥💯',
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'Twitter User',
		quote: `OMG!!

		@tembo_io
		 is so cool 🔥

		My admiration and respect towards
		@PostgreSQL quadrupled.`,
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'Hemanth Soni',
		role: 'Growth & Partnerships Lead',
		company: 'Goldsky',
		quote: "Tembo is the only player who thinks about multi-tenant use cases at the core of the platform rather than an add-on. Combined with the simple flexibility of stacks, it's quickly growing as a share of our total database usage.",
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'Engineer',
		role: 'Engineer',
		company: 'Arch',
		quote: 'Tembo makes trying and using Postgres extensions easy, which has unlocked a world of possibilities with regards to the kinds of problems Postgres can solve for you.',
		logoUrl: '/elephant1.svg',
	},
	{
		name: 'Neofit Sergeev',
		role: 'Engineer',
		company: 'CloudBreezy',
		quote: 'Tembo offers a great combination of superb products and excellent support.',
		logoUrl: '/elephant1.svg',
	},
];

interface Props {
	className?: string;
}

const Quotes: React.FC<Props> = ({ className }) => {
	const swiperRef = useRef<SwiperCore>();
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className={styles('relative overflow-hidden', className)}>
			<Swiper
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				onRealIndexChange={(element) =>
					setActiveIndex(element.activeIndex)
				}
				effect='coverflow'
				grabCursor
				centeredSlides
				loop={true}
				slidesPerView={'auto'}
				speed={350}
				coverflowEffect={{
					rotate: 0,
					depth: 0,
				}}
			>
				{quotes.map((it, i) => (
					<SwiperSlide key={`${it.name}-${i}`} className='!w-[350px]'>
						<div className='flex flex-col justify-between h-full'>
							<div>
								<img
									src={'/quotes.svg'}
									alt={'quotation mark'}
									height={11}
									width={15}
								/>
								<p className='mt-4 font-secondary font-normal text-white text-[19px] leading-[31px] tracking-[0.54px]'>
									{it.quote}
								</p>
							</div>
							<div className='flex gap-4 items-center'>
								<div
									className={
										'h-12 w-12 shrink-0 overflow-hidden rounded-full'
									}
								>
									<img
										src={it.logoUrl}
										alt={`${it.company} logo`}
										className='h-full object-cover'
									/>
								</div>
								<div>
									<span className='block font-secondary font-bold text-white text-[15px] leading-[18px] tracking-[0.54px]'>
										{it?.name ? it.name : 'Anonymous'}
									</span>
									<span className='mt-2 block font-secondary font-normal text-white text-[13px] leading-[15px] tracking-[0.54px] opacity-60'>
										{it.role}
										{`${it?.company ? `, ${it.company}` : ''}`}
									</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{quotes.length > 1 && (
				<div
					className={
						'absolute bottom-[35px] z-10 left-1/2 -translate-x-1/2'
					}
				>
					<Container styles='flex justify-between w-screen'>
						<button
							type='button'
							className='h-[42px] w-[42px] disabled:invisible'
							onClick={() => {
								swiperRef.current?.slidePrev();
							}}
							disabled={activeIndex === 0}
						>
							<img
								src={'/forwardArrow.svg'}
								alt={'back arrow'}
								className='rotate-180'
							/>
						</button>
						<button
							type='button'
							className='h-[42px] w-[42px] disabled:invisible'
							onClick={() => {
								swiperRef.current?.slideNext();
							}}
							disabled={activeIndex === quotes.length - 1}
						>
							<img
								src={'/forwardArrow.svg'}
								alt={'forward arrow'}
							/>
						</button>
					</Container>
				</div>
			)}
		</section>
	);
};

export default Quotes;

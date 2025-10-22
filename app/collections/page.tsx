"use client"

import { ArrowRight } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// ============================================================================
// LogoLoop Component (Integrated)
// ============================================================================

type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };
    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);
};

const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === 'left' ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;
      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative overflow-x-hidden group',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          className
        ),
      [scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        const isNodeItem = 'node' in item;
        const content = isNodeItem ? (
          <span
            className={cx(
              'inline-flex items-center',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110'
            )}
            aria-hidden={!!(item as any).href && !(item as any).ariaLabel}
          >
            {(item as any).node}
          </span>
        ) : (
          <img
            className={cx(
              'h-[var(--logoloop-logoHeight)] w-auto block object-cover',
              '[-webkit-user-drag:none] pointer-events-none',
              '[image-rendering:-webkit-optimize-contrast]',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-105'
            )}
            src={(item as any).src}
            srcSet={(item as any).srcSet}
            sizes={(item as any).sizes}
            width={(item as any).width}
            height={(item as any).height}
            alt={(item as any).alt ?? ''}
            title={(item as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? ((item as any).ariaLabel ?? (item as any).title)
          : ((item as any).alt ?? (item as any).title);

        const inner = (item as any).href ? (
          <a
            className={cx(
              'inline-flex items-center no-underline rounded',
              'transition-opacity duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={(item as any).href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
              scaleOnHover && 'overflow-visible group/item'
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [scaleOnHover]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="flex items-center"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 left-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 right-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
          </>
        )}
        <div
          className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}
          ref={trackRef}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

// ============================================================================
// Collections Page Component
// ============================================================================

interface CollectionItem {
  title: string;
  image: string;
}

interface CollectionCarouselProps {
  year: string;
  collections: CollectionItem[];
  direction: 'left' | 'right';
}

const CollectionCarousel: React.FC<CollectionCarouselProps> = ({ year, collections, direction }) => {
  // Convert collections to LogoLoop format
  const logoItems: LogoItem[] = collections.map(collection => ({
    src: collection.image,
    alt: collection.title,
    title: collection.title
  }));

  return (
    <div key={year} className="space-y-8">
      <h3 
        className="text-3xl md:text-5xl text-[#2E2B26]"
        style={{ fontFamily: 'Hornset, sans-serif' }}
      >
        {year}
      </h3>
      
      <LogoLoop
        logos={logoItems}
        speed={60}
        direction={direction}
        logoHeight={500}
        gap={16}
        pauseOnHover={true}
        fadeOut={false}
        scaleOnHover={true}
        ariaLabel={`${year} collection images`}
      />
    </div>
  );
};

const CollectionsPage = () => {
  const collectionsByYear = [
    {
      year: 'FALL 2024',
      collections: [
        { title: 'Look 1', image: '/2024 Fall/1.webp' },
        { title: 'Look 2', image: '/2024 Fall/2.webp' },
        { title: 'Look 3', image: '/2024 Fall/3.webp' },
        { title: 'Look 4', image: '/2024 Fall/4.webp' },
        { title: 'Look 5', image: '/2024 Fall/5.webp' },
        { title: 'Look 6', image: '/2024 Fall/6.webp' },
        { title: 'Look 7', image: '/2024 Fall/7.webp' },
        { title: 'Look 8', image: '/2024 Fall/8.webp' },
        { title: 'Look 9', image: '/2024 Fall/9.webp' },
        { title: 'Look 10', image: '/2024 Fall/10.webp' },
        { title: 'Look 11', image: '/2024 Fall/11.webp' },
        { title: 'Look 12', image: '/2024 Fall/12.webp' },
        { title: 'Look 13', image: '/2024 Fall/13.webp' },
        { title: 'Look 14', image: '/2024 Fall/14.webp' },
        { title: 'Look 15', image: '/2024 Fall/15.webp' },
        { title: 'Look 16', image: '/2024 Fall/16.webp' },
        { title: 'Look 17', image: '/2024 Fall/17.webp' },
        { title: 'Look 18', image: '/2024 Fall/18.webp' },
        { title: 'Look 19', image: '/2024 Fall/19.webp' },
        { title: 'Look 20', image: '/2024 Fall/20.webp' },
        { title: 'Look 21', image: '/2024 Fall/21.webp' },
        { title: 'Look 22', image: '/2024 Fall/22.webp' },
      ]
    },
    {
      year: 'FALL 2023',
      collections: [
        { title: 'Look 1', image: '/2023 Fall/1.webp' },
        { title: 'Look 2', image: '/2023 Fall/2.webp' },
        { title: 'Look 3', image: '/2023 Fall/3.webp' },
        { title: 'Look 4', image: '/2023 Fall/4.webp' },
        { title: 'Look 5', image: '/2023 Fall/5.webp' },
        { title: 'Look 6', image: '/2023 Fall/6.webp' },
        { title: 'Look 7', image: '/2023 Fall/7.webp' },
        { title: 'Look 8', image: '/2023 Fall/8.webp' },
        { title: 'Look 9', image: '/2023 Fall/9.webp' },
        { title: 'Look 10', image: '/2023 Fall/10.webp' },
        { title: 'Look 11', image: '/2023 Fall/11.webp' },
        { title: 'Look 12', image: '/2023 Fall/12.webp' },
      ]
    },
    {
      year: 'SUMMER 2023',
      collections: [
        { title: 'Look 1', image: '/2023 Summer/1.webp' },
        { title: 'Look 2', image: '/2023 Summer/2.webp' },
        { title: 'Look 3', image: '/2023 Summer/3.webp' },
        { title: 'Look 4', image: '/2023 Summer/4.webp' },
        { title: 'Look 5', image: '/2023 Summer/5.webp' },
        { title: 'Look 6', image: '/2023 Summer/6.webp' },
        { title: 'Look 7', image: '/2023 Summer/7.webp' },
        { title: 'Look 8', image: '/2023 Summer/8.webp' },
        { title: 'Look 9', image: '/2023 Summer/9.webp' },
        { title: 'Look 10', image: '/2023 Summer/10.webp' },
        { title: 'Look 11', image: '/2023 Summer/11.webp' },
        { title: 'Look 12', image: '/2023 Summer/12.webp' },
        { title: 'Look 13', image: '/2023 Summer/13.webp' },
        { title: 'Look 14', image: '/2023 Summer/14.webp' },
      ]
    },
    {
      year: 'FALL 2022',
      collections: [
        { title: 'Look 1', image: '/2022 Fall/1.webp' },
        { title: 'Look 2', image: '/2022 Fall/2.webp' },
        { title: 'Look 3', image: '/2022 Fall/3.webp' },
        { title: 'Look 4', image: '/2022 Fall/4.webp' },
        { title: 'Look 5', image: '/2022 Fall/5.webp' },
        { title: 'Look 6', image: '/2022 Fall/6.webp' },
        { title: 'Look 7', image: '/2022 Fall/7.webp' },
        { title: 'Look 8', image: '/2022 Fall/8.webp' },
        { title: 'Look 9', image: '/2022 Fall/9.webp' },
        { title: 'Look 10', image: '/2022 Fall/10.webp' },
        { title: 'Look 11', image: '/2022 Fall/11.webp' },
        { title: 'Look 12', image: '/2022 Fall/12.webp' },
        { title: 'Look 13', image: '/2022 Fall/13.webp' },
      ]
    },
    {
      year: 'FALL 2021',
      collections: [
        { title: 'Look 1', image: '/2021 Fall/1.webp' },
        { title: 'Look 2', image: '/2021 Fall/2.webp' },
        { title: 'Look 3', image: '/2021 Fall/3.webp' },
        { title: 'Look 4', image: '/2021 Fall/4.webp' },
        { title: 'Look 5', image: '/2021 Fall/5.webp' },
        { title: 'Look 6', image: '/2021 Fall/6.webp' },
        { title: 'Look 7', image: '/2021 Fall/7.webp' },
        { title: 'Look 8', image: '/2021 Fall/8.webp' },
        { title: 'Look 9', image: '/2021 Fall/9.webp' },
        { title: 'Look 10', image: '/2021 Fall/10.webp' },
        { title: 'Look 11', image: '/2021 Fall/11.webp' },
        { title: 'Look 12', image: '/2021 Fall/12.webp' },
        { title: 'Look 13', image: '/2021 Fall/13.webp' },
        { title: 'Look 14', image: '/2021 Fall/14.webp' },
        { title: 'Look 15', image: '/2021 Fall/15.webp' },
        { title: 'Look 16', image: '/2021 Fall/16.webp' },
        { title: 'Look 17', image: '/2021 Fall/17.webp' },
        { title: 'Look 18', image: '/2021 Fall/18.webp' },
        { title: 'Look 19', image: '/2021 Fall/19.webp' },
        { title: 'Look 20', image: '/2021 Fall/20.webp' },
        { title: 'Look 21', image: '/2021 Fall/21.webp' },
        { title: 'Look 22', image: '/2021 Fall/22.webp' },
      ]
    },
    {
      year: 'WINTER 2020',
      collections: [
        { title: 'Look 1', image: '/2020 Winter/1.webp' },
        { title: 'Look 2', image: '/2020 Winter/2.webp' },
        { title: 'Look 3', image: '/2020 Winter/3.webp' },
        { title: 'Look 4', image: '/2020 Winter/4.webp' },
        { title: 'Look 5', image: '/2020 Winter/5.webp' },
        { title: 'Look 6', image: '/2020 Winter/6.webp' },
        { title: 'Look 7', image: '/2020 Winter/7.webp' },
        { title: 'Look 8', image: '/2020 Winter/8.webp' },
        { title: 'Look 9', image: '/2020 Winter/9.webp' },
        { title: 'Look 10', image: '/2020 Winter/10.webp' },
      ]
    },
  ]

  return (
    <section className="pt-32 pb-16 md:py-24 bg-[#FFFFFF] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl md:text-8xl text-[#ffffff] relative z-10 mb-[-1.5rem] md:mb-[-2.5rem] mix-blend-difference mt-16"
          style={{ 
            fontFamily: 'Hornset, sans-serif',
            lineHeight: '0.8',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          ARCHIVE COLLECTIONS
        </h2>

        <div className="space-y-20 mt-20">
          {collectionsByYear.map((yearData, index) => (
            <CollectionCarousel 
              key={yearData.year}
              year={yearData.year}
              collections={yearData.collections}
              direction={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <a 
            href="/shop" 
            className="inline-flex items-center hover:underline text-[#2E2B26] text-xl md:text-2xl px-8 py-4 border-2 border-[#2E2B26] rounded-full transition-all hover:bg-[#2E2B26] hover:text-[#FFFBF4]"
            style={{ fontFamily: 'Hornset, sans-serif' }}
          >
            SHOP CURRENT COLLECTION
            <ArrowRight size={24} className="ml-3" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default CollectionsPage
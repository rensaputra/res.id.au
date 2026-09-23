import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import VisitorCounter from './VisitorCounter';
import { useVisitorCount } from './VisitorCounter/useVisitorCount';

export default function Hero() {
  const avatarUrl = useBaseUrl('/images/ava.jpg');
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.customFields?.visitorCounterApiBaseUrl as string | undefined;
  const state = useVisitorCount(baseUrl);

  return (
    <header className={clsx(styles.hero, 'pt-8 bg-gradient-to-r from-[#1b2733] to-[#442d34]')}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-white mb-4">
            <img
              src={avatarUrl}
              alt="Rendy Eka Saputra"
              width={400}
              height={400}
              className="h-full w-full scale-125 object-cover"
            />
          </div>
          <h1 className={clsx('mb-0 text-3xl font-bold leading-tight tracking-wider')}>
            <span className={styles.initial}>R</span>ENDY <span className={styles.initial}>E</span>
            KA <span className={styles.initial}>S</span>APUTRA
          </h1>
          <h2
            className={clsx(
              'mb-0 mt-0 text-sm leading-tight text-gray-400 rounded-full bg-gray-100/10 px-2 py-1 tracking-wider',
            )}
          >
            Full-Stack Engineer. Cloud Builder. Lifelong Learner.
          </h2>
        </div>
        <p className="mt-4 tracking-normal leading-normal text-lg text-gray-100">
          I’m a Senior Software Engineer & Technical Consultant based in Sydney, specializing in
          full-stack architecture, cloud solutions, and resilient web platforms. Lifelong learner,
          constant tinkerer, and proud dad.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        <Link to="/docs/intro" className={clsx(styles['button-primary'])}>
          Read Docs
          <ChevronRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
        </Link>
        <span className="flex flex-row items-center justify-center space-x-3">
          <a
            href="https://github.com/rensaputra"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles['button-secondary'])}
          >
            <svg
              viewBox="0 0 496 512"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 block "
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rendyekasaputra/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles['button-secondary'])}
          >
            <svg
              viewBox="0 0 448 512"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 block mr-1"
            >
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
            LinkedIn
          </a>
        </span>
      </div>
      <VisitorCounter state={state} />
    </header>
  );
}

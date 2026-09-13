import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Hero(): React.ReactElement {
  return (
    <header className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-8">
        <img
          src={useBaseUrl('/img/icon-512.png')}
          alt="Profile Picture"
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-widest uppercase text-gray-900 dark:text-gray-100">
        <span className="text-[#0073bb]">R</span>endy{' '}
        <span className="text-[#0073bb]">E</span>ka{' '}
        <span className="text-[#0073bb]">S</span>aputra
      </h1>
      <p className="max-w-4xl text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
        I am the <span className="underline decoration-gray-400 underline-offset-4">creator of Ruby on Rails</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">creator of Omarchy</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">co-owner of 37signals</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">best-selling author</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">Le Mans class-winning racing driver</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">investor in Danish startups</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">Shopify board member</span>,{' '}
        <span className="underline decoration-gray-400 underline-offset-4">frequent podcast guest</span>, and{' '}
        <span className="underline decoration-gray-400 underline-offset-4">family man</span>.
      </p>
    </header>
  );
}

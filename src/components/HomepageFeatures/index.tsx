import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Technical Portfolio',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_code_typing.svg').default,
    description: (
      <>
        Explore my professional background, showcase of past projects, and hands-on experience in
        software engineering and cloud architecture.
      </>
    ),
  },
  {
    title: 'Extensive Documentation',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_files.svg').default,
    description: (
      <>
        Deep dive into detailed technical guides, tutorials, and structured notes on AWS, React,
        Node.js, and more.
      </>
    ),
  },
  {
    title: 'Open Knowledge',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_community.svg').default,
    description: (
      <>
        Built on the principle of sharing knowledge. All documentation is open source—contributions
        and feedback are always welcome.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

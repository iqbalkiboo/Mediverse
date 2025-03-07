import cx from 'classnames';

import styles from './heading.module.css';

interface HeadingProps {
  title?: string;
  size?: string;
  customClassName?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, size, customClassName }) => {
  return (
    <div>
      <h1
        className={cx(styles.heading, `text-${size || '2xl'}`, customClassName)}
      >
        {title}
      </h1>
    </div>
  );
};

export default Heading;

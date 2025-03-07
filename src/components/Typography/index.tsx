import cx from 'classnames';

import './typography.css';

const variantsMapping = {
  xh1: 'h1',
  xh2: 'h1',
  xh3: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  subtitle1: 'h6',
  subtitle2: 'h6',
  subtitle3: 'h6',
  subtitle4: 'h6',
  bodyLg: 'p',
  bodyBase: 'p',
  bodySmall: 'p',
  bodyXSmall: 'p',
  bodyXxSmall: 'p',
  smallMedium: 'p',
  xSmallMedium: 'p',
  buttonHeavy1: 'p',
  buttonHeavy2: 'p',
  buttonHeavy3: 'p',
  buttonLight1: 'p',
  buttonLight2: 'p',
  buttonLight3: 'p',
};

interface TypographyProps {
  variant?: string;
  color?: string;
  customClass?: string;
  children?: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  customClass = '',
  children,
  ...props
}) => {
  const Component = variant ? variantsMapping[variant] : 'p';

  return (
    <Component
      className={cx(
        `${color || ''}`,
        { [`typography__variant-${variant}`]: variant },
        customClass && customClass
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;

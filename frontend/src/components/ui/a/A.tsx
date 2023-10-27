import Link, { LinkProps } from "next/link";

interface IAProps extends LinkProps {
  className?: string,
  children: any
}

const A: React.FC<IAProps> = ({ className, children, ...restProps }) => (
  <Link className={`${className} hover:underline`} {...restProps}>
    {children}
  </Link>
);


export default A;

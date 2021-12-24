import NextLink from 'next/link';

export default function Link({
  href,
  className,
  isExternal = false,
  children,
  ...props
}) {
  const externalProps = isExternal && {
    rel: 'noreferrer',
    target: '_blank',
  };

  const isRouteLink = href.startsWith('/');

  if (isRouteLink && !isExternal) {
    return (
      <NextLink href={href} passHref>
        <a {...props} className={className}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a href={href} className={className} {...props} {...externalProps}>
      {children}
    </a>
  );
}

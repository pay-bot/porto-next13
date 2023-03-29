import clsx from "clsx";
import Link, { LinkProps } from "next/link";

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  tempLink?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<"a"> &
  LinkProps;

export default function UnstyledLink({
  children,
  href,
  openNewTab,
  tempLink,
  className,
  ...rest
}: UnstyledLinkProps) {
  const isNewTab =
    openNewTab !== undefined
      ? openNewTab
      : href && !href.startsWith("/") && !href.startsWith("#");

  if (!isNewTab && !tempLink) {
    return (
      <Link {...rest} className={className} href={href}>
        {/* {children} */}
      </Link>
    );
  }
  if (!isNewTab && tempLink) {
    return (
      <a {...rest} className={className} href={href}>
        {children}
      </a>
    );
  }
  console.log("🚀 ~ file: UnstyledLink.tsx:11 ~ tempLink:", tempLink);

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
      className={clsx(className, "cursor-newtab")}
    >
      {children}
    </a>
  );
}

import { MDXRemote as MDXR, type MDXRemoteProps } from "next-mdx-remote/rsc";
import TechIcons from "@/app/components/TechIcons";
import CodeTitle from "../MDXComponents/code-title";
import { clsxm } from "@/utils";
import Pre from "@/app/components/pre";
import Callout from "@/app/components/Callout";

const Components = {
  TechIcons: (props) => <TechIcons {...props} />,
  CodeTitle: (props) => <CodeTitle {...props} />,
  Callout: (props) => <Callout {...props} />,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={clsxm(
        "relative rounded border bg-gray-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-base text-gray-600",
        className
      )}
      {...props}
    />
  ),
  pre: Pre,
};

const MDXRemote = (props: MDXRemoteProps) => (
  // @ts-ignore
  <MDXR
    {...props}
    components={{ ...(Components as any), ...(props.components || {}) }}
  />
);

export default MDXRemote;
export { Components };



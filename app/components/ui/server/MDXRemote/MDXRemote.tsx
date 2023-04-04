import { MDXRemote as MDXR, type MDXRemoteProps } from "next-mdx-remote/rsc";
import * as MDXComponents from "../MDXComponents";
import { Link } from "@alpian/ui";
import TechIcons from "@/app/components/TechIcons";
import CodeTitle from "../MDXComponents/code-title";

const Components: typeof MDXComponents = {
  TechIcons: (props) => <TechIcons {...props} />,
  CodeTitle: (props) => <CodeTitle {...props} />,
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


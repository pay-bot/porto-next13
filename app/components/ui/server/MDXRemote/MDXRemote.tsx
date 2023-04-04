import { MDXRemote as MDXR, type MDXRemoteProps } from "next-mdx-remote/rsc";
import * as MDXComponents from "../MDXComponents";
import { Link } from "@alpian/ui";
import TechIcons from "@/app/components/TechIcons";

const Components: typeof MDXComponents = {
  TechIcons: (props) => <TechIcons {...props} />,
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


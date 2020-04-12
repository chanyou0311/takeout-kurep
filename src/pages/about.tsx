import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => (
  <div>
    <h1>About</h1>
    <Link href="/index">
      <a>index page</a>
    </Link>
  </div>
);

export default About;

import { Fragment } from "react";
import ImageView from "../components/ImageView";
import BackBtn from "./BackBtn";
import DayNightMood from "./DayNightMood";
import Header from "./Header";
const Layout = ({ children, blog, name, avatar_url }) => {
  return (
    <Fragment>
      <ImageView />
      {/* page loading */}
      {/* End */}
      {/* Header Start */}
      <Header blog={blog} name={name} avatar_url={avatar_url} />
      {/* Main Start */}
      <main className="main-left pp-main-section">{children}</main>
      <DayNightMood />
      {blog && <BackBtn />}
    </Fragment>
  );
};
export default Layout;

import Navbar from "./navbar";
import Sidenav from "./sidenav";

export default function Layout(props) {
  const { children, open, handleDrawerToggle } = props;
  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidenav open={open} handleDrawerToggle={handleDrawerToggle} />
      {children}
    </>
  );
}

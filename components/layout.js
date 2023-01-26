import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

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

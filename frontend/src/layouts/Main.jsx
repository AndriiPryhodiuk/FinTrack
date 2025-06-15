// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//  helper functions
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  // Get userFullName directly from localStorage since it's stored as a plain string, not JSON
  const userName = localStorage.getItem("userFullName");
  return { userName };
}

const Main = () => {
  //const { userName } = useLoaderData()

  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Main;

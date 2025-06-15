// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//  helper functions
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
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

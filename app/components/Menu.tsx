import { NavLink} from "@remix-run/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function Menu({items}) {
  const activeStyle = {
    textDecoration: "underline",
  };
  const activeClassName = " text-gray-200";
  const menuItemClasses = "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
  return (
    <div>
      <ul className="mt-6">
        {items && items.map((item) => (
          <li className="relative px-6 py-3" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? menuItemClasses + activeClassName : menuItemClasses
              }
            >
              <span className="ml-4">{item.title}</span>
            </NavLink>
                {/* <!-- Active items have the snippet below -->
                <!-- <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span> --> */}

                {/* <!-- Add this classNamees to an active anchor (a tag) -->
                <!-- text-gray-800 dark:text-gray-100 --> */}
                
          </li>
        ))}
      </ul>
    </div>
  );
}
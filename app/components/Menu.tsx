import { NavLink} from "@remix-run/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export type MenuItem = {
  path: string;
  title: string;
}

export type MenuProps = {
  items: MenuItem[];
  preFetch?: boolean
}

export default function Menu({items, preFetch = true}: MenuProps) {
  const activeStyle = {
    textDecoration: "underline",
  };
  const activeClassName = " text-gray-200";
  const menuItemClasses = "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
  return (
    <div>
      <ul className="mt-6">
        {items && items.map((item: MenuItem) => (
          <li className="relative px-6 py-3" key={item.path}>
            <NavLink
              to={item.path}
              prefetch={preFetch ? 'intent' : 'none'}
              className={({ isActive }) =>
                isActive ? menuItemClasses + activeClassName : menuItemClasses
              }
            >
              <span className="ml-4">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { Link } from "@remix-run/react";
import { EyeIcon, QueueListIcon } from '@heroicons/react/24/solid'

export default function IndexRoute() {
  return <div className="flex justify-center align-middle items-center flex-col" style={{height: '100%'}}>
      <h1 className="text-white font-medium text-3xl drop-shadow-xl mb-8">A Remix app</h1>
      <Link to="work" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        <QueueListIcon className="h-6 w-6 text-white-500"/>
        <span className="ml-3">Browse listing</span></Link>
    </div>;
}
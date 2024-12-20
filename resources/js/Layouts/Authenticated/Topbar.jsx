import { Link } from "@inertiajs/react";
import { useState, useRef } from "react";



function Topbar({name}) {
    const [dropdownOpen, setDropwdowm] = useState(true);
    const dropdownTarget = useRef()
    const trigerDropdown = () => {
        if (dropdownOpen) {
            dropdownTarget.current.classList.remove('hidden');
        } else {
            dropdownTarget.current.classList.add("hidden");
        }
        setDropwdowm(!dropdownOpen)
    }
    return (
        <div className="flex justify-between items-center cursor-pointer">
            <input
                type="text"
                className="top-search"
                placeholder="Search movie, cast, genre"
            />
            <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">
                    Welcome, {name}
                </span>
                <div className="collapsible-dropdown flex flex-col gap-2 relative">
                    <div
                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                        onClick={trigerDropdown}
                    >
                        <img
                            src="/images/avatar.png"
                            className="rounded-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div
                        className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                        id="dropdown-target"
                        ref={dropdownTarget}
                    >
                        <a
                            href="#!"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#!"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Settings
                        </a>
                        <Link
                            href={route('logout')}
                            method="post"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx="tru">
                {`
                    .top-search {
                        ackground-image: url("/icons/ic_search.svg");
                    }
                `}
            </style>
        </div>
    );
}

export default Topbar;

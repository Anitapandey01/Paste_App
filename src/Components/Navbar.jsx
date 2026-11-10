
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">

            <div className="max-w-6xl mx-auto flex justify-between items-center">

                <NavLink
                    to="/"
                    className="text-2xl font-bold text-blue-400"
                >
                    PasteApp
                </NavLink>

                <div className="flex items-center gap-6">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `font-medium transition hover:text-blue-400 ${
                                isActive ? "text-blue-400" : "text-white"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/pastes"
                        className={({ isActive }) =>
                            `font-medium transition hover:text-blue-400 ${
                                isActive ? "text-blue-400" : "text-white"
                            }`
                        }
                    >
                        My Pastes
                    </NavLink>

                </div>

            </div>

        </nav>
    )
}

export default Navbar

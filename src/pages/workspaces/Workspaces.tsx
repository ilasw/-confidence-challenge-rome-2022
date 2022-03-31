import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Workspace } from '../../model/workspace';
import { getWorkspaces } from '../../utils/workspaces.actions';

export const Workspaces: React.FC = () => {
  // replace everything with Redux. This is just a demo
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  useEffect(() => {
    (async () => {
      getWorkspaces()
        .then(res => setWorkspaces(res.data))
    })()
  }, [])

  return (
    <div>
      <div className="bg-sky-300 p-3">
        <h1 className="text-3xl text-center mb-2">Workspaces</h1>

        <form className="flex gap-2 relative max-w-3xl mx-auto justify-center">
          <input
            type="text" name="name" placeholder="Workspace name"
            className="text-2xl "/>
          <textarea name="description" placeholder="Workspace description" />
          <button type="submit" className="btn"> SAVE </button>
          <button type="button" className="btn">+</button>
        </form>

      </div>

      <div className="max-w-xl	m-4 sm:mx-auto">
        <div className="overflow-y-scroll max-h-screen">
          {
            workspaces.map(w => {
              return (
                <div
                  key={w.id}
                  className="flex justify-between items-center p-2 cursor-pointer border-b bg-sky-600 text-white"
                >
                  <div>
                    <div className="text-sm font-bold">{w.name}</div>
                    <em className="text-xs">{w.description}</em>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn ">delete</button>
                    <NavLink to={`workspaces/${w.id}`}>
                      <button className="btn">open</button>
                    </NavLink>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};


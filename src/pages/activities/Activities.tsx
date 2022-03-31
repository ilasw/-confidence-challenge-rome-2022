import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Activity, priorityColors, User } from '../../model/activity';
import { getActivities, resetActivities } from '../../utils/activities.actions';

export const Activities: React.VFC = () => {
  const { id } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (id) {
      getActivities(+id)
        .then(res => {
          setActivities(res[0].data);
          setUsers(res[1].data);
        })
    }
  }, [id]);

  // NOT IMPORTANT FOR CHALLENGE
  // utility to delete all activities in current workspace and reload defaults
  function loadFakeData() {
    if (id) {
      resetActivities(+id)
       .then(res => setActivities(res))
    }
  }

  return (
    <div>
      <div className="bg-sky-300 p-3">
        <div className="page">
          <Link to="/" className="text-3xl text-center mb-2">Workspace #{id}</Link>
        </div>
      </div>

      <div className="page">
        {/* FORM to add a new activity */}
        <form>
          <input
            type="text"
            name="title"
            placeholder="Add Activity and press enter"
          />
        </form>


        {/* ACTIVITIES lis t*/}
        {
          activities?.map((activity) => {
            return (
              <div key={activity.id} className="m-1 p-3 border-b" style={{ borderLeft: `3px solid ${priorityColors['high'] || 'white'}`}}>
                {/* first row: activity data */}
                <div className="flex justify-between items-start my-3 gap-1">

                  {/* title and description */}
                  <div className="flex justify-between items-center grow">
                    <div className="w-full">
                      <input
                        name="title"
                        type="text"
                        defaultValue={activity.title}
                      />

                      <input
                        name="title"
                        type="text"
                        defaultValue={activity.description}
                      />
                    </div>
                  </div>


                  {/* AssignTo & Priority */}
                  <div className="flex gap-2 items-center">
                    <select
                      value={activity.assignedTo?.id}
                      onChange={() => {}}
                    >
                      <option value={-1}>Assign to</option>
                      { users.map(user => <option key={user.id} value={user.id}>{user.name}</option>) }
                    </select>

                    <select defaultValue={activity.priority}>
                      <option value={-1}>Priority</option>
                      <option value={'high'}>High</option>
                      <option value={'middle'}>Medium</option>
                      <option value={'low'}>Low</option>
                    </select>
                  </div>
                </div>

                {/* second row: timer and action menu*/}
                <div className="flex gap-1 items-center justify-between">
                  {/*Timer*/}
                  <div className="flex gap-2 items-center">
                    <button className="icon">
                      <i className="fa fa-play pl-1" />
                    </button>
                    <button className="icon">
                      <i className="fa fa-pause pl-1" />
                    </button>
                    <button className="icon">
                      <i className="fa fa-stop pl-1" />
                    </button>
                    <div className="font-sm"><i className="fa fa-clock-o" /> {formatTime(180) || formatTime(activity.duration)}</div>
                  </div>

                  {/* Actions Menu */}
                  <div className="flex items-center gap-2">
                    <button className="icon">
                      <i className="fa fa-trash pl-1"/>
                    </button>
                    <button className="icon">
                      <i className="fa fa-clone pl-1"/>
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        }





        <div className="mt-8">
          {
            id && (<button
              className="text-xs"
              onClick={loadFakeData}
            >
                IMPORT FAKE DATA IN THIS WORKSPACE
            </button>)
          }
        </div>
      </div>
    </div>
  )
};


function formatTime(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substr(11, 8);
}

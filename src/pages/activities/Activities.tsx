import React, {FormEventHandler, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Activity, priorityColors, priorityValues} from '../../model/activity';
import {useDispatch, useSelector} from "react-redux";
import {
  doAddActivity, doCloneActivity, doEditActivityField,
  doGetActivities,
  doRemoveActivity,
  doResetActivities,
  selectActivities,
  selectUsers
} from "../../store";
import InputHidden from "../../components/input-hidden";

export const Activities: React.VFC = () => {
  const {id} = useParams();
  const activities = useSelector(selectActivities);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id?.length) return;

    dispatch(doGetActivities(id));
  }, [id]);

  // NOT IMPORTANT FOR CHALLENGE
  // utility to delete all activities in current workspace and reload defaults
  const loadFakeData = () => id?.length && dispatch(doResetActivities(id));
  const removeActivity = (id: Activity['id']) => dispatch(doRemoveActivity(id));
  const cloneActivity = (activity: Activity) => dispatch(doCloneActivity(activity));
  const findUserById = (userId: string) => users?.find(({id}) => id === Number(userId))

  const [newTaskName, setNewTaskName] = useState<string>("");
  const handleAddNewActivity: FormEventHandler = (e) => {
    e.preventDefault();

    if (!id?.length) throw new Error('You are not in a valid workspace');
    dispatch(doAddActivity(newTaskName, id));
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
          <form onSubmit={handleAddNewActivity}>
            <input
                type="text"
                name="title"
                placeholder="Add Activity and press enter"
                value={newTaskName}
                onChange={e => setNewTaskName(e?.currentTarget?.value)}
            />
          </form>


          {/* ACTIVITIES lis t*/}
          {
            activities?.map((activity) => {
              return (
                  <div key={activity.id} className="m-1 p-3 border-b"
                       style={{borderLeft: `3px solid ${priorityColors['high'] || 'white'}`}}>
                    {/* first row: activity data */}
                    <div className="flex justify-between items-start my-3 gap-1">

                      {/* title and description */}
                      <div className="flex justify-between items-center grow">
                        <div className="w-full">
                          <InputHidden label={activity.title}>
                            <input
                                name="title"
                                type="text"
                                onBlur={(e) => dispatch(doEditActivityField<'title'>(activity.id, 'title', e.target.value))}
                                defaultValue={activity.title}
                            />
                          </InputHidden>

                          <InputHidden label={activity.description || '[descrizione vuota...]'}>
                            <input
                                name="title"
                                type="text"
                                onBlur={(e) => dispatch(doEditActivityField<'description'>(activity.id, 'description', e.target.value))}
                                defaultValue={activity.description}
                            />
                          </InputHidden>
                        </div>
                      </div>


                      {/* AssignTo & Priority */}
                      <div className="flex gap-2 items-center">
                        <InputHidden label={activity.assignedTo?.name || '[utent vuoto...]'}>
                          <select
                              value={activity.assignedTo?.id}
                              onBlur={(e) => {
                                const user = findUserById(e.target.value);
                                if (user) {
                                  dispatch(doEditActivityField<'assignedTo'>(activity.id, 'assignedTo', user))
                                }
                              }}>
                            <option value={-1}>Assign to</option>
                            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                          </select>
                        </InputHidden>

                        <InputHidden label={activity.priority || '[priority vuota...]'}>
                          <select defaultValue={activity.priority}
                                  onBlur={(e) => {
                                    // @ts-ignore
                                    if (priorityValues.includes(e.target.value)) {
                                      const value = e.target.value;
                                      // @ts-ignore
                                      dispatch(doEditActivityField<'priority'>(activity.id, 'priority', value))
                                    }
                                  }}
                          >
                            <option value={-1}>Priority</option>
                            <option value={'high'}>High</option>
                            <option value={'middle'}>Medium</option>
                            <option value={'low'}>Low</option>
                          </select>
                        </InputHidden>
                      </div>
                    </div>

                    {/* second row: timer and action menu*/}
                    <div className="flex gap-1 items-center justify-between">
                      {/*Timer*/}
                      <div className="flex gap-2 items-center">
                        {activity?.duration && (<>
                          <button className="icon">
                            <i className="fa fa-play pl-1"/>
                          </button>
                          <button className="icon">
                            <i className="fa fa-pause pl-1"/>
                          </button>
                          <button className="icon">
                            <i className="fa fa-stop pl-1"/>
                          </button>
                          <div className="font-sm"><i
                              className="fa fa-clock-o"/> {formatTime(180) || formatTime(activity.duration)}</div>
                        </>)}
                      </div>

                      {/* Actions Menu */}
                      <div className="flex items-center gap-2">
                        <button className="icon"
                                onClick={_ => removeActivity(activity.id)}>
                          <i className="fa fa-trash pl-1"/>
                        </button>
                        <button className="icon"
                                onClick={_ => cloneActivity(activity)}>
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

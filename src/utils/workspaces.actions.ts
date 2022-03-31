import Axios from 'axios';
import { Workspace } from '../model/workspace';

/**
 * Get all available workspaces
 */
export const getWorkspaces = async () => {
  return await Axios.get<Workspace[]>('http://localhost:3001/workspaces')
}

/**
 * Delete workspace
 * @param id   workspace id
 */
export const deleteWorkspace = async (id: number) => {
    return await Axios.delete(`http://localhost:3001/workspaces/${id}`);
};

/**
 * Add new workspace
 * @param workspace   workspace object (can be partial)
 */
export const addWorkspace = async (workspace: Partial<Workspace>)  => {
    return await Axios.post<Workspace>('http://localhost:3001/workspaces', workspace);
};

/**
 * edit workspace
 * @param workspace   workspace object (can be partial)
 */
export const editWorkspace = async (workspace: Partial<Workspace>) => {
  return await Axios.patch<Workspace>(`http://localhost:3001/workspaces/${workspace.id}`, workspace);
};

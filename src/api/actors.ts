import axios from "axios";
import { ActorSummary } from "../Models";

/**
 * Gets an actor by id from the backend
 * 
 * @param backend the backend url to request from
 * @param id the id of the actor to get
 * @returns the actor with the given id
 */
async function getActorById(backend : string, id : string) : Promise<ActorSummary>  {
    let url = `${backend}/actors/${id}`;
    const response = await axios.get(url);
    return response.data;
}

export {
    getActorById
}
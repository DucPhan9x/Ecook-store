import { v4 as uuidv4 } from "uuid";

export const uuid = () => uuidv4().substring(0, 13);

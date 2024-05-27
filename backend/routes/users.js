import { Router } from "express";

const route = new Router();

route.get('/',(req,res)=>res.send('<h1>Users</h1>'))
route.get('/login',(req,res)=>res.send('<h1>Users Login</h1>'))

export default route;
export const abc = 1;
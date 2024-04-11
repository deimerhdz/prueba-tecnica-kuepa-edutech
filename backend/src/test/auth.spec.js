import  request  from "supertest"
import 'dotenv/config'
import ServerExpress from "../server"
const server = new ServerExpress()
describe('POST /auth',()=>{
    test('should be respond with a uid',async()=>{
        const reponse = await request(server.app).post('/api/auth/register').send({
            name:'test test',
            username:'Cristian',
            password:'123456',
            role:'MODERATOR'
        });
        expect(reponse.body.user.uid).toBeDefined();
    })
    test('should be respond with a user and token',async()=>{
        const reponse = await request(server.app).post('/api/auth/login').send({
            username:'Cristian',
            password:'123456',
           
        });
        expect(reponse.body.user).toBeDefined();
        expect(reponse.body.token).toBeDefined();
    })
})
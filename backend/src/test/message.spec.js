import  request  from "supertest"
import 'dotenv/config'
import ServerExpress from "../server"
const server = new ServerExpress()
describe('Get /messages',()=>{
   
    test('should be respond with array',async()=>{
        await request(server.app).post('/api/auth/register').send({
            name:'Jose test',
            username:'Jose-test',
            password:'123456',
            role:'MODERATOR'
        });
        const reponse = await request(server.app).post('/api/auth/login').send({
            username:'Jose-test',
            password:'123456',
           
        });
        const reponseMessage = await request(server.app).get('/api/messages')
        .set('token',reponse.body.token)
        .send();
        expect(reponseMessage.body).toBeInstanceOf(Array);
    })
})
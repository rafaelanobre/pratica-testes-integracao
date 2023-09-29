import app from "index";
import supertest from "supertest";
import fruits from "data/fruits";
import { Fruit } from "repositories/fruits-repository";

type FruitsCreation = Omit<Fruit, "id">;

const server = supertest(app);

describe("Get fruits test", () => {
    it("should return status 200 and fruits array at /fruits", async () => {
        const response = await server.get('/fruits')
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fruits);
    })
})

describe("Get fruit by id test", () => {
    it("should return status 200 and fruits array at /fruits", async () => {
        const response = await server.get('/fruits/1')
        if (fruits.length >=1){
            expect(response.status).toBe(200);
            expect(response.body).toEqual(fruits[0]);
        }
        else{
            expect(response.status).toBe(404)
        }
    })
    it("should return status 400 when id param is present but not valid", async () => {
        const response = await server.get('/fruits/id-inválido')
        expect(response.status).toBe(400);
    })
})

describe("Post fruits test", () => {
    it("should create a fruit", async () => {
        const fruit: FruitsCreation = {
            name: 'Bergamota',
            price: 2.50
        };
        const { status } = await server.post("/fruits").send(fruit);
        expect(status).toBe(201);
    });

    it("should return status 422 when inserting a fruit without price", async () => {
        const fruit = {
            name: 'Banana',
        };
        const { status } = await server.post("/fruits").send(fruit);
        expect(status).toBe(422);
    })

    it("should return status 422 when inserting a fruit without name", async () => {
        const fruit = {
            price: 11,
        };
        const { status } = await server.post("/fruits").send(fruit);
        expect(status).toBe(422);
    })

    it("should return status 409 when trying to create 2 fruits with the same name", async () => {
        const fruit: FruitsCreation = {
            name: 'Bergamota',
            price: 2.50
        };
        const { status } = await server.post("/fruits").send(fruit);
        expect(status).toBe(409);
    })
})